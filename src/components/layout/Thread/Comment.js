import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    runTransaction,
    updateDoc,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../fb";
import useInput from "../../../Hooks/useInput";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import Reply from "./Reply";

const Comment = ({ commentObj, currentUser, threadId }) => {
    const [isLiked, setIsLiked] = useState(
        currentUser && commentObj.likes.includes(currentUser.uid)
    );
    const [likedNumber, setLikedNumber] = useState(commentObj.likes.length);
    const [replies, setReplies] = useState([]);
    const [isReplying, setIsReplying] = useState(false);
    const replyInput = useInput(`@${commentObj.owner.displayName} `);
    const commentRef = doc(
        db,
        "threads",
        threadId,
        "comments",
        commentObj.docId
    );
    const repliesRef = collection(
        db,
        "threads",
        threadId,
        "comments",
        commentObj.docId,
        "replies"
    );

    useEffect(() => {
        const repliesQuery = query(repliesRef, orderBy("createdAt", "desc"));
        const stopSnapShot = onSnapshot(repliesQuery, (snapshot) => {
            const arr = [];
            snapshot.forEach((reply) => {
                if (reply.exists()) {
                    arr.push({ docId: reply.id, ...reply.data() });
                }
            });
            setReplies(arr);
        });
        return () => {
            stopSnapShot();
        };
    }, []);

    const checkLikeStateAndRunTransactionHandler = async () => {
        if (!isLiked) {
            setIsLiked(true);
            setLikedNumber((prev) => prev + 1);
        } else if (isLiked) {
            setIsLiked(false);
            setLikedNumber((prev) => prev - 1);
        }
        try {
            await runTransaction(db, async (transaction) => {
                const sectionDoc = await transaction.get(commentRef);
                if (!sectionDoc.exists()) {
                    throw new Error("해당 글이 존재하지 않습니다");
                }
                if (!isLiked) {
                    transaction.update(commentRef, {
                        likes: arrayUnion(currentUser.uid),
                    });
                } else if (isLiked) {
                    transaction.update(commentRef, {
                        likes: arrayRemove(currentUser.uid),
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addReplyHandler = async (event) => {
        event.preventDefault();
        const reply = replyInput.value.trim();
        try {
            setIsReplying(false);
            await addDoc(repliesRef, {
                comment: reply,
                createdAt: Date.now(),
                owner: {
                    displayName: currentUser.displayName,
                    uid: currentUser.uid,
                    photoURL: currentUser.photoURL,
                },
            });
            replyInput.onChange({
                target: { value: `@${commentObj.owner.displayName} ` },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const updateCommentHandler = async (updatedValue) => {
        const comment = updatedValue.trim();
        await updateDoc(commentRef, {
            comment,
        });
    };

    const deleteCommentHandler = async () => {
        if (window.confirm("You are about to delete this comment. Continue?")) {
            await deleteDoc(commentRef);
        }
    };
    return (
        <>
            <CommentCard
                currentUser={currentUser}
                dataObj={commentObj}
                onToggleReplying={() => setIsReplying((prev) => !prev)}
                onUpdate={updateCommentHandler}
                onDelete={deleteCommentHandler}
                onLikeTransaction={checkLikeStateAndRunTransactionHandler}
                likedNumber={likedNumber}
                isLiked={isLiked}
                isReply={false}
            />
            {isReplying && (
                <CommentForm
                    onSubmit={addReplyHandler}
                    commentInput={replyInput}
                    onCancel={() => setIsReplying(false)}
                    submitComment="Reply"
                    defaultValue={`@${commentObj.owner.displayName}`}
                    isReply={true}
                />
            )}
            {replies.map((reply) => (
                <Reply
                    replyObj={reply}
                    currentUser={currentUser}
                    threadId={threadId}
                    commentId={commentObj.docId}
                    repliesRef={repliesRef}
                    key={reply.docId}
                />
            ))}
        </>
    );
};

export default Comment;
