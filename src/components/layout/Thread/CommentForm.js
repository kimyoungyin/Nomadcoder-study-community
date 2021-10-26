import { useState } from "react";
import Button from "../../UI/Button";

const CommentForm = ({ onSubmit, commentInput }) => {
    const [isWriting, setIsWriting] = useState(false);
    const finishWritingAndSUbmit = (event) => {
        event.preventDefault();
        setIsWriting(false);
        onSubmit();
    };

    return (
        <>
            {!isWriting ? (
                <button
                    className="thread-commentBtn"
                    onClick={() => setIsWriting(true)}
                >
                    add a comment
                </button>
            ) : (
                <form
                    onSubmit={finishWritingAndSUbmit}
                    className="thread-commentForm"
                >
                    <textarea
                        type="text"
                        placeholder="Leave a comment..."
                        {...commentInput}
                    />
                    <div className="thread-btns">
                        <Button
                            py={2}
                            disabled={commentInput.value.trim() === ""}
                        >
                            <span>Write a comment</span>
                        </Button>
                        <span onClick={() => setIsWriting(false)}>cancel</span>
                    </div>
                </form>
            )}
        </>
    );
};

export default CommentForm;
