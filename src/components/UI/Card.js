import styled from "styled-components";

const Card = styled.div`
    /* :root {
        --tw-shadow:${(props) =>
        props.isMain
            ? "0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)"
            : "0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)"}
        --tw-ring-offset-shadow: 0 0 transparent;
        --tw-ring-shadow: 0 0 transparent;    
    } */
    padding: ${(props) => (props.isAuth ? "2.5rem 2rem" : "1.25rem")};
    border-radius: ${(props) => (props.isAuth ? "0.5rem" : "0.375rem")};
    background-color: ${(props) =>
        props.isMain ? "rgba(254,252,232, 1)" : "white"};
    margin-bottom: ${(props) => (props.isMain ? "0.75rem" : null)};
    /* box-shadow: var(--tw-ring-offset-shadow, 0 0 transparent),
        var(--tw-ring-shadow, 0 0 transparent), var(--tw-shadow); */
`;

export default Card;
