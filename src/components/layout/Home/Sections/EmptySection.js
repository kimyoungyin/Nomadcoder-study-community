import styled from "styled-components";

const StyledEmptySection = styled.div`
    margin-top: 5rem;
    padding: 1.25rem 0;
    background-color: #f9fafb;
    text-align: center;
    font-weight: 500;
    color: ${(props) => props.theme.grey_900};
    box-shadow: ${(props) => props.theme.shdow_inset};
    border-radius: 0.375rem;
`;

const EmptySection = () => {
    return (
        <StyledEmptySection>
            No posts here yet, create one! 😬
        </StyledEmptySection>
    );
};

export default EmptySection;
