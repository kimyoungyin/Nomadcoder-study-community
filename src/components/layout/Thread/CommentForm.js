import styled from "styled-components";
import Button from "../../UI/Button";

const StyledCommentForm = styled.form`
    width: 100%;
    padding: 2rem 0 2.5rem ${(props) => (props.isReply ? "4rem" : 0)};
    textarea {
        //reset
        border: 1px solid ${(props) => props.theme.grey_400};
        overflow: auto;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        resize: none;
        width: 100%;
        font-family: inherit;
        padding: 1rem 1.25rem;
        margin-bottom: 0.5rem;
        border-radius: 0.375rem;
        font-size: 1rem;
    }
    .thread-btns {
        display: flex;
        justify-content: space-between;
        @media (min-width: 768px) {
            justify-content: flex-start;
        }
        & > span {
            padding: 0.5rem 1rem;
            margin-left: 0.5rem;
            font-weight: 500;
            border: 1px solid ${(props) => props.theme.grey_200};
            border-radius: 0.5rem;
            cursor: pointer;
        }
    }
    button {
        width: 75%;
        @media (min-width: 768px) {
            width: 25%;
        }
        &:disabled,
        &[disabled] {
            background-color: #d1d5db;
            opacity: 0.5;
            span {
                color: #4b5563;
            }
        }
    }
`;

const CommentForm = ({
    onSubmit,
    commentInput,
    onCancel,
    submitComment,
    defaultValue,
    isReply,
}) => {
    const isDisabled =
        commentInput.value.trim() === "" ||
        commentInput.value.trim() === defaultValue;
    return (
        <StyledCommentForm
            onSubmit={onSubmit}
            isReply={isReply}
            className="thread-commentForm"
        >
            <textarea
                autoFocus
                type="text"
                placeholder="Leave a comment..."
                {...commentInput}
            />
            <div className="thread-btns">
                <Button py={2} disabled={isDisabled}>
                    <span>{submitComment}</span>
                </Button>
                <span onClick={onCancel}>cancel</span>
            </div>
        </StyledCommentForm>
    );
};

export default CommentForm;
