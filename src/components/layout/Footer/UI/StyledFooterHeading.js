import styled from "styled-components";

const StyledFooterHeading = styled.h4`
    line-height: 1.25rem;
    font-weight: 600;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
    text-transform: uppercase;
    color: ${(props) => props.theme.grey_400};
`;

export default StyledFooterHeading;
