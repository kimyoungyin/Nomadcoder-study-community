import styled from "styled-components";

const Card = styled.div`
    padding: ${(props) => (props.isAuth ? "2.5rem 2rem" : "1.25rem")};
    border-radius: ${(props) => (props.isAuth ? "0.5rem" : "0.375rem")};
    background-color: ${(props) =>
        props.isMain ? props.theme.yellow : "white"};
    margin-bottom: ${(props) => (props.isMain ? "0.75rem" : null)};
    box-shadow: ${(props) => props.theme.shadow_lg};
`;

export default Card;
