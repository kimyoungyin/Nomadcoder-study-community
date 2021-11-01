import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
} from "@firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../../../fb";
import useInput from "../../../Hooks/useInput";
import { authState } from "../../../recoil/authRecoil";
import SectionInfo from "../common/SectionInfo";
import parse from "html-react-parser";
import styled from "styled-components";
import Card from "../../UI/Card";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const StyledThreadGrid = styled.div`
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
    .thread-totalComments {
        width: 100%;
        color: #4b5563;
        font-weight: 500;
    }
    .thread-comments {
        margin-top: 1.25rem;
        width: 100%;
    }
`;

const ThreadCard = styled(Card)`
    width: 100%;
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

const ThreadGrid = ({ threadId }) => {
    const user = useRecoilValue(authState);
    const [threadObj, setThreadObj] = useState(null);
    const [comments, setComments] = useState([]);
    const [isWriting, setIsWriting] = useState(false);
    const isMounted = useRef(false);
    const commentInput = useInput("");
    const docRef = doc(db, "threads", threadId);
    const commentsCollectionRef = collection(
        db,
        "threads",
        threadId,
        "comments"
    );

    const commentQuery = query(
        commentsCollectionRef,
        orderBy("createdAt", "desc")
    );

    useEffect(() => {
        isMounted.current = true;
        const fetchThreadData = async () => {
            const thread = await getDoc(docRef);
            if (thread.exists() && isMounted.current) {
                setThreadObj(thread.data());
            }
            onSnapshot(commentQuery, (snapshot) => {
                const arr = [];
                snapshot.forEach((doc) => {
                    if (doc.exists()) {
                        arr.push({ docId: doc.id, ...doc.data() });
                    }
                });
                isMounted.current && setComments(arr);
            });
        };
        fetchThreadData();
        return () => {
            isMounted.current = false;
        };
    }, []);
    const finishWritingAndSubmitHandler = async (event) => {
        event.preventDefault();
        const comment = commentInput.value.trim();
        try {
            setIsWriting(false);
            await addDoc(commentsCollectionRef, {
                comment,
                createdAt: Date.now(),
                likes: [],
                owner: {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StyledThreadGrid>
            {threadObj && (
                <>
                    <ThreadCard as="section" isMain={threadObj.isPinned}>
                        <SectionInfo
                            section={{
                                ...threadObj,
                                docId: threadId,
                            }}
                            displayName={user?.displayName}
                        />
                        <div className="thread-content">
                            {parse(threadObj.content)}
                        </div>
                    </ThreadCard>
                    {isWriting ? (
                        <CommentForm
                            onSubmit={finishWritingAndSubmitHandler}
                            onCancel={() => setIsWriting(false)}
                            commentInput={commentInput}
                            submitComment="Write a comment"
                        />
                    ) : (
                        <button
                            className="thread-commentBtn"
                            onClick={() => setIsWriting(true)}
                        >
                            add a comment
                        </button>
                    )}
                    {comments.length !== 0 && (
                        <>
                            <div className="thread-totalComments">
                                {comments.length} comments
                            </div>
                            <div className="thread-comments">
                                {comments.map((commentObj) => (
                                    <Comment
                                        commentObj={commentObj}
                                        currentUser={user}
                                        threadId={threadId}
                                        key={commentObj.docId}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </StyledThreadGrid>
    );
};

/* {comment.replyArr.map((reply) => {
            return (
                <Comment
                    commentObj={comment}
                    replyObj={reply}
                    isReply={true}
                    key={reply.docId}
                    currentUser={user}
                    threadId={threadId}
                />
            );
        })} */
export default ThreadGrid;
