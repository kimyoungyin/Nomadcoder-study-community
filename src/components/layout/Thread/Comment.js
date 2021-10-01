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
    }
`;

const Comment = ({ doc }) => {
    return (
        <CommentCard>
            <div className="comment-info">
                <div>
                    <LikeButton
                        onChangeLikeData={() => {}}
                        likedNumber={doc.likes.length}
                        isLiked={false}
                    />
                    <div className="comment-ownerData">
                        <img
                            src={doc.owner.photoURL}
                            alt={doc.owner.displayName}
                        />
                        <div>
                            <span>{doc.owner.displayName}</span>
                            <span>{useTerm(doc.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>{doc.comment}</div>
        </CommentCard>
    );
};

export default Comment;
