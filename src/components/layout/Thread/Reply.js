import { addDoc, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../../fb";
import useInput from "../../../Hooks/useInput";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const Reply = ({ replyObj, currentUser, threadId, commentId, repliesRef }) => {
    const [isReplying, setIsReplying] = useState(false);
    const history = useHistory();
    const replyInput = useInput(`@${replyObj.owner.displayName} `);

    const replyRef = doc(
        db,
        "threads",
        threadId,
        "comments",
        commentId,
        "replies",
        replyObj.docId
    );

    const addReplyHandler = async (event) => {
        event.preventDefault();
        const reply = replyInput.value.trim();
        try {
            if (!currentUser) {
                alert("로그인 하시면 댓글을 달 수 있어요!");
                return history.push("/join");
            }
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
                target: { value: `@${replyObj.owner.displayName} ` },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const updateCommentHandler = async (updatedValue) => {
        const comment = updatedValue.trim();
        await updateDoc(replyRef, {
            comment,
        });
    };

    const deleteCommentHandler = async () => {
        if (window.confirm("You are about to delete this comment. Continue?")) {
            await deleteDoc(replyRef);
        }
    };

    return (
        <>
            <CommentCard
                currentUser={currentUser}
                dataObj={replyObj}
                onToggleReplying={() => setIsReplying((prev) => !prev)}
                onUpdate={updateCommentHandler}
                onDelete={deleteCommentHandler}
                isReply={true}
            />
            {isReplying && (
                <CommentForm
                    onSubmit={addReplyHandler}
                    commentInput={replyInput}
                    onCancel={() => setIsReplying(false)}
                    submitComment="Reply"
                    defaultValue={`@${replyObj.owner.displayName}`}
                    isReply={true}
                />
            )}
        </>
    );
};

export default Reply;
