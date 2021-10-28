import { addDoc, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { useState } from "react";
import { db } from "../../../fb";
import useInput from "../../../Hooks/useInput";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const Reply = ({ replyObj, currentUser, threadId, commentId, repliesRef }) => {
    const [isReplying, setIsReplying] = useState(false);
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

    const addReply = async (event) => {
        event.preventDefault();
        const reply = replyInput.value.trim();
        try {
            setIsReplying(false);
            await addDoc(repliesRef, {
                comment: reply,
                createdAt: Date.now(),
                owner: {
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const updateComment = async (updatedValue) => {
        await updateDoc(replyRef, {
            comment: updatedValue,
        });
    };

    const deleteComment = async () => {
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
                onUpdate={updateComment}
                onDelete={deleteComment}
                isReply={true}
            />
            {isReplying && (
                <CommentForm
                    onSubmit={addReply}
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
