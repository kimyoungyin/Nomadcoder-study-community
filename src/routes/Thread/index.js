import { doc, getDoc } from "@firebase/firestore";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SectionInfo from "../../components/layout/common/SectionInfo";
import Card from "../../components/UI/Card";
import { db } from "../../fb";
import { authState } from "../../recoil/authRecoil";

const StyledThread = styled.div`
    margin-top: 7rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0 2rem;
    max-width: 1280px;
    display: grid;
    grid-gap: 3.5rem;
    gap: 3.5rem;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: "goBack card card card ";
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

const ThreadCard = styled(Card)`
    grid-area: card;
    padding: 1.25rem;
    .thread-content {
        margin-top: 1.25rem;
        margin-left: 4rem;
        p > * {
            padding: 0.75rem 0;
        }
        img {
            max-width: 100%;
        }
    }
`;

const Thread = ({ match }) => {
    const [threadObj, setThreadObj] = useState(null);
    const user = useRecoilValue(authState);
    useEffect(() => {
        const fetchThread = async () => {
            const docRef = doc(db, "threads", match.params.docId);
            const thread = await getDoc(docRef);
            if (thread.exists()) {
                setThreadObj(thread.data());
            }
        };
        fetchThread();
    }, [match.params.docId]);
    console.log(threadObj);

    return (
        <StyledThread>
            <Link to="/" className="thread-goBack">
                <div>← Go back</div>
            </Link>
            {threadObj && (
                <ThreadCard as="section" isMain={threadObj.isPinned}>
                    <SectionInfo
                        section={{
                            ...threadObj,
                            docId: match.params.docId,
                        }}
                        displayName={user ? user.displayName : null}
                    />
                    <div className="thread-content">
                        {parse(threadObj.content)}
                    </div>
                </ThreadCard>
            )}
        </StyledThread>
    );
};

export default Thread;
