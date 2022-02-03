import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ThreadGrid from "../../components/layout/Thread/ThreadGrid";

const StyledThread = styled.div`
    margin-top: 2.5rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0 2rem;
    max-width: 1280px;
    display: grid;
    grid-gap: 1.25rem;
    gap: 1.25rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-template-areas:
        "goBack"
        "card";
    @media (min-width: 640px) {
        margin-top: 3rem;
    }
    @media (min-width: 768px) {
        margin-top: 4rem;
        grid-gap: 3.5rem;
        gap: 3.5rem;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        grid-template-areas: "goBack card card card ";
    }
    @media (min-width: 1024px) {
        margin-top: 5rem;
    }
    @media (min-width: 1280px) {
        margin-top: 7rem;
    }

    .thread-goBack {
        grid-area: goBack;
        div {
            color: ${(props) => props.theme.blue_light};
            font-weight: 500;
        }
        &:hover div {
            text-decoration: underline;
        }
    }
`;

const Thread = ({ match }) => {
    const threadId = match.params.docId;
    return (
        <StyledThread>
            <Link to="/" className="thread-goBack">
                <div>← Go back</div>
            </Link>
            <ThreadGrid threadId={threadId} />
        </StyledThread>
    );
};

export default Thread;
