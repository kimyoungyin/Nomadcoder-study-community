import {
    arrayRemove,
    arrayUnion,
    doc,
    runTransaction,
} from "@firebase/firestore";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { db } from "../../../fb";
import useTerm from "../../../Hooks/useTerm";
import Card from "../../UI/Card";
import LikeButton from "../common/LikeButton";

const CommentCard = styled(Card)`
    padding: 0.75rem;
    padding-bottom: 1.25rem;
    margin-left: ${(props) => props.isSub && "4rem"};
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
        margin-left: ${(props) => props.isSub || "4rem"};
        color: black;
    }
`;

const Comment = ({ commentObj, displayName, threadId, isSub }) => {
    const [isLiked, setIsLiked] = useState(
        commentObj.likes.includes(displayName)
    );
    const [likedNumber, setLikedNumber] = useState(commentObj.likes.length);
    const history = useHistory();
    const term = useTerm(commentObj.createdAt);
    const commentRef = doc(
        db,
        "threads",
        threadId,
        "comments",
        commentObj.docId
    );
    console.log(likedNumber);

    const checkLikeStateAndRunTransaction = async () => {
        if (!displayName) {
            alert("로그인 하시면 추천할 수 있어요!");
            return history.push("/join");
        }
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
                        likes: arrayUnion(displayName),
                    });
                } else if (isLiked) {
                    transaction.update(commentRef, {
                        likes: arrayRemove(displayName),
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CommentCard isSub={isSub}>
            <div className="comment-top">
                <div className="comment-info">
                    {isSub || (
                        <LikeButton
                            onLikeTransaction={checkLikeStateAndRunTransaction}
                            likedNumber={likedNumber}
                            isLiked={isLiked}
                        />
                    )}
                    <div className="comment-ownerData">
                        <img
                            src={commentObj.owner.photoURL}
                            alt={commentObj.owner.displayName}
                        />
                        <div>
                            <span className="comment-ownerName">
                                {commentObj.owner.displayName}
                            </span>
                            <span className="comment-createdAt">
                                &nbsp;|&nbsp;{term}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="comment-icons">
                    <div className="comment-makeSub" onClick={() => {}}>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    {commentObj.owner.displayName === displayName && (
                        <>
                            <div className="comment-edit">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                </svg>
                            </div>
                            <div className="comment-delte">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                        fill-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="comment-text">{commentObj.comment}</div>
        </CommentCard>
    );
};

export default Comment;
