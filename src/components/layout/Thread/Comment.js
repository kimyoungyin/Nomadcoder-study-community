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

const Comment = ({ doc }) => {
    return (
        <CommentCard>
            <div className="comment-info">
                <LikeButton
                    onChangeLikeData={() => {}}
                    likedNumber={doc.likes.length}
                    isLiked={false}
                />
                <div className="comment-ownerData">
                    <img src={doc.owner.photoURL} alt={doc.owner.displayName} />
                    <div>
                        <span className="comment-ownerName">
                            {doc.owner.displayName}
                        </span>
                        <span className="comment-createdAt">
                            &nbsp;|&nbsp;{useTerm(doc.createdAt)}
                        </span>
                    </div>
                </div>
            </div>
            <div>{doc.comment}</div>
        </CommentCard>
    );
};

export default Comment;
