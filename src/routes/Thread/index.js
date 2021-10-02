import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
} from "@firebase/firestore";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SectionInfo from "../../components/layout/common/SectionInfo";
import Comment from "../../components/layout/Thread/Comment";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import { db } from "../../fb";
import useInput from "../../Hooks/useInput";
import { authState } from "../../recoil/authRecoil";

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

const ThreadGrid = styled.div`
    grid-area: card;
    display: flex;
    flex-direction: column;
    align-items: center;
    .thread-commentBtn {
        border: 2px solid ${(props) => props.theme.grey_500};
        background-color: transparent;
        border-radius: 9999px;
        margin: 2.5rem 0;
        padding: 0.25rem 2.5rem;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 0.875rem;
        cursor: pointer;
    }
    .thread-commentForm {
        width: 100%;
        margin: 2rem 0 2.5rem 0;
        textarea {
            //reset
            border: 1px solid ${(props) => props.theme.grey_400};
            overflow: auto;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            resize: none;
            width: 100%;
            font-family: inherit;
            padding: 1rem 1.25rem;
            margin-bottom: 0.5rem;
            border-radius: 0.375rem;
            font-size: 1rem;
        }
        .thread-btns {
            display: flex;
            & > span {
                padding: 0.5rem 1rem;
                margin-left: 0.5rem;
                font-weight: 500;
                border: 1px solid ${(props) => props.theme.grey_200};
                border-radius: 0.5rem;
                cursor: pointer;
            }
        }
        button {
            width: 75%;
            @media (min-width: 768px) {
                width: 25%;
            }
            &:disabled,
            &[disabled] {
                background-color: #d1d5db;
                opacity: 0.5;
                span {
                    color: #4b5563;
                }
            }
        }
    }
    .thread-comments {
        margin-top: 1.25rem;
        width: 100%;
    }
`;

const ThreadCard = styled(Card)`
    padding: 1.25rem;
    .thread-content {
        margin-top: 0.75rem;
        margin-left: 4rem;
        * {
            color: black;
        }
        & > * {
            padding: 0.75rem 0;
        }
        ul,
        ol {
            list-style: inside;
            padding-left: 1rem;
        }
        img,
        video {
            max-width: 100%;
            height: auto;
        }
        h1,
        h2,
        h3 {
            padding: 0;
            margin: 1.5rem 0;
        }
        h1 {
            font-size: 2rem;
        }
        h2 {
            font-size: 1.5rem;
        }
        h3 {
            font-size: 1.125rem;
        }
        h6 {
            font-size: 0.75rem;
        }
        strong {
            font-weight: bold;
        }
        i {
            font-style: italic;
        }
        a {
            font-weight: 500;
            text-decoration: underline;
        }
    }
`;

const Thread = ({ match }) => {
    const [threadObj, setThreadObj] = useState(null);
    const [comments, setComments] = useState([]);
    const [isWriting, setIsWriting] = useState(false);
    const user = useRecoilValue(authState);
    const docId = match.params.docId;
    const docRef = doc(db, "threads", docId);
    const commentsCollectionRef = collection(db, "threads", docId, "comments");
    const commentInput = useInput("");

    useEffect(() => {
        const fetchData = async () => {
            const thread = await getDoc(docRef);
            const q = query(
                commentsCollectionRef,
                orderBy("createdAt", "desc")
            );
            // await 필요 없는 snapshot
            onSnapshot(q, (snapshot) => {
                const arr = [];
                snapshot.forEach((doc) => {
                    if (doc.exists())
                        arr.push({ docId: doc.id, ...doc.data() });
                });
                setComments(arr);
            });
            if (thread.exists()) {
                setThreadObj(thread.data());
            }
        };
        fetchData();
    }, [commentsCollectionRef, docRef]);
    const commentSubmitHandler = async (event) => {
        event.preventDefault();
        const comment = commentInput.value.trim();
        const docRef = await addDoc(commentsCollectionRef, {
            comment,
            createdAt: Date.now(),
            likes: [],
            owner: {
                displayName: user.displayName,
                photoURL: user.photoURL,
            },
        });
        console.log("Document written with ID: ", docRef.id);
    };

    return (
        <StyledThread>
            <Link to="/" className="thread-goBack">
                <div>← Go back</div>
            </Link>
            <ThreadGrid>
                {threadObj && (
                    <>
                        <ThreadCard as="section" isMain={threadObj.isPinned}>
                            <SectionInfo
                                section={{
                                    ...threadObj,
                                    docId,
                                }}
                                displayName={user ? user.displayName : null}
                            />
                            <div className="thread-content">
                                {parse(threadObj.content)}
                            </div>
                        </ThreadCard>
                        {!isWriting ? (
                            <button
                                className="thread-commentBtn"
                                onClick={() => setIsWriting(true)}
                            >
                                add a comment
                            </button>
                        ) : (
                            <form
                                onSubmit={commentSubmitHandler}
                                className="thread-commentForm"
                            >
                                <textarea
                                    type="text"
                                    placeholder="Leave a comment..."
                                    {...commentInput}
                                />
                                <div className="thread-btns">
                                    <Button
                                        py={2}
                                        disabled={
                                            commentInput.value.trim() === ""
                                        }
                                    >
                                        <span>Write a comment</span>
                                    </Button>
                                    <span onClick={() => setIsWriting(false)}>
                                        cancel
                                    </span>
                                </div>
                            </form>
                        )}
                        <div>{comments.length} comments</div>
                        <div className="thread-comments">
                            {comments.map((doc) => (
                                <Comment doc={doc} key={doc.docId} />
                            ))}
                        </div>
                    </>
                )}
            </ThreadGrid>
        </StyledThread>
    );
};

export default Thread;
