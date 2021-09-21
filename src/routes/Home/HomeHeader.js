import styled from "styled-components";

const StyledHomeHeader = styled.div`
    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
        font-size: 3rem;
        line-height: 1;
        font-weight: 600;
        color: ${(props) => props.theme.grey_910};
    }
    p {
        font-size: 1.25rem;
        margin: 0.75rem 0 2rem;
    }
`;

const HomeHeader = ({ categoryObj }) => {
    return (
        <StyledHomeHeader>
            <h2>{categoryObj ? `#${categoryObj.category}` : "Community"}</h2>
            <p>
                {categoryObj
                    ? categoryObj.description
                    : "개발자 99% 커뮤니티에서 수다 떨어요!"}
            </p>
        </StyledHomeHeader>
    );
};

export default HomeHeader;
