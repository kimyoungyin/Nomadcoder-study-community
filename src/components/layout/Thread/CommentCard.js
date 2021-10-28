import { useState } from "react";
import styled from "styled-components";
import useInput from "../../../Hooks/useInput";
import useTerm from "../../../Hooks/useTerm";
import Card from "../../UI/Card";
import LikeButton from "../common/LikeButton";
import CommentForm from "./CommentForm";

const StyledCommentCard = styled(Card)`
    padding: 0.75rem;
    padding-bottom: 1.25rem;
    margin-left: ${(props) => props.isReply && "4rem"};
    .comment-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .comment-info {
            display: flex;
            align-items: center;
            .comment-ownerData {
                display: flex;
                align-items: center;
                img {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    margin-right: 0.75rem;
                }
                div {
                    display: flex;
                    align-items: center;
                    line-height: 1.5;
                    .comment-ownerName {
                        font-weight: 600;
                        font-size: 0.875rem;
                    }
                    .comment-createdAt {
                        font-size: 0.75rem;
                    }
                }
            }
        }
        .comment-icons {
            display: flex;
            & > div {
                width: 1rem;
                margin-right: 0.75rem;
                cursor: pointer;
                & > svg > path {
                    color: black;
                }
            }
        }
    }
    .comment-text {
        margin-top: 1rem;
        margin-left: ${(props) => props.isReply || "4rem"};
        color: black;
    }
`;

const CommentCard = ({
    currentUser,
    dataObj,
    onToggleReplying,
    onEdit,
    onDelete,
    onLikeTransaction,
    likedNumber,
    isLiked,
    isReply,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const editInput = useInput(dataObj.comment);
    const term = useTerm(dataObj.createdAt);

    return (
        <StyledCommentCard isReply={isReply}>
            <div className="comment-top">
                <div className="comment-info">
                    {isReply || (
                        <LikeButton
                            onLikeTransaction={onLikeTransaction}
                            likedNumber={likedNumber}
                            isLiked={isLiked}
                        />
                    )}
                    <div className="comment-ownerData">
                        <img
                            src={dataObj.owner.photoURL}
                            alt={dataObj.owner.displayName}
                        />
                        <div>
                            <span className="comment-ownerName">
                                {dataObj.owner.displayName}
                            </span>
                            <span className="comment-createdAt">
                                &nbsp;|&nbsp;{term}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="comment-icons">
                    <div className="comment-makeSub" onClick={onToggleReplying}>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    {dataObj.owner.displayName === currentUser.displayName && (
                        <>
                            <div
                                className="comment-edit"
                                onClick={() => setIsEditing((prev) => !prev)}
                            >
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                </svg>
                            </div>
                            <div className="comment-delete" onClick={onDelete}>
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {isEditing ? (
                <CommentForm
                    onSubmit={() => {}}
                    commentInput={editInput}
                    onCancel={() => setIsEditing(false)}
                    submitComment="Save changes"
                    defaultValue={dataObj.comment}
                    isReply={false}
                />
            ) : (
                <div className="comment-text">{dataObj.comment}</div>
            )}
        </StyledCommentCard>
    );
};

export default CommentCard;
