import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledLikeButton = styled.div`
    background-color: white;
    border: 2px solid ${(props) => (props.isLiked ? "#10b981" : "#d1d5db")};
    * {
        color: ${(props) => (props.isLiked ? "#10b981" : props.theme.grey_900)};
    }
    border-radius: 0.375rem;
    margin-right: 1.25rem;
    padding: 0 0.75rem;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const LikeButton = ({ onChangeLikeData, likedNumber, isLiked }) => {
    return (
        <StyledLikeButton
            className="section-likeBox"
            onClick={onChangeLikeData}
            isLiked={isLiked}
        >
            <FontAwesomeIcon icon={faAngleUp} />
            <div>{likedNumber}</div>
        </StyledLikeButton>
    );
};

export default LikeButton;
