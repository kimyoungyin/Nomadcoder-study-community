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
    width: 100%;
    padding: 0.75rem;
    padding-bottom: 1.25rem;
    .comment-info {
        display: flex;
        align-items: center;
        .comment-ownerData {
            display: flex;
            img {
                width: 2rem;
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
`;

const Comment = ({ commentObj, displayName, threadId }) => {
    const [isLiked, setIsLiked] = useState(
        commentObj.likes.includes(displayName)
    );
    const [likedNumber, setLikedNumber] = useState(commentObj.likes.length);
    const history = useHistory();
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
        <CommentCard>
            <div className="comment-info">
                <LikeButton
                    onLikeTransaction={checkLikeStateAndRunTransaction}
                    likedNumber={likedNumber}
                    isLiked={isLiked}
                />
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
                            &nbsp;|&nbsp;{useTerm(commentObj.createdAt)}
                        </span>
                    </div>
                </div>
            </div>
            <div>{commentObj.comment}</div>
        </CommentCard>
    );
};

export default Comment;
