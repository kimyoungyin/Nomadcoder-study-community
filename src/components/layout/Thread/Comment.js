import styled from "styled-components";
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

const Comment = ({ commentObj }) => {
    return (
        <CommentCard>
            <div className="comment-info">
                <LikeButton
                    onLikeTransaction={() => {}}
                    likedNumber={commentObj.likes.length}
                    isLiked={false}
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
