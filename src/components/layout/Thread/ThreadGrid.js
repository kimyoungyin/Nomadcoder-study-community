import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
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
import { useHistory } from "react-router";

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
    const currentUser = useRecoilValue(authState);
    const [threadObj, setThreadObj] = useState(null);
    const [comments, setComments] = useState([]);
    const [isWriting, setIsWriting] = useState(false);
    const isMounted = useRef(false);
    const history = useHistory();
    const commentInput = useInput("");
    const threadRef = doc(db, "threads", threadId);
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
            const thread = await getDoc(threadRef);
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
            if (!currentUser) {
                alert("로그인 하시면 댓글을 달 수 있어요!");
                return history.push("/join");
            }
            await addDoc(commentsCollectionRef, {
                comment,
                createdAt: Date.now(),
                likes: [],
                owner: {
                    displayName: currentUser.displayName,
                    uid: currentUser.uid,
                    photoURL: currentUser.photoURL,
                },
            });
            commentInput.onChange({ target: { value: "" } });
        } catch (error) {
            console.log(error);
        }
    };

    const threadDeleteHandler = async () => {
        if (window.confirm("You are about to delete this post. Continue?")) {
            try {
                const allComments = await getDocs(commentsCollectionRef);
                const allCommentsId = await allComments.docs.map(
                    async (commentObj) => {
                        await deleteDoc(
                            doc(
                                db,
                                "threads",
                                threadId,
                                "comments",
                                commentObj.id
                            )
                        );
                        return doc.id;
                    }
                );
                allCommentsId.map(async (commentId) => {
                    const allReplies = await getDocs(
                        collection(
                            db,
                            "threads",
                            threadId,
                            "comments",
                            commentId,
                            "replies"
                        )
                    );
                    allReplies.docs.map(async (replyObj) => {
                        await deleteDoc(
                            doc(
                                db,
                                "threads",
                                threadId,
                                "comments",
                                commentId,
                                "replies",
                                replyObj.id
                            )
                        );
                    });
                });
                await deleteDoc(threadRef);
                history.push("/");
            } catch (error) {
                console.log(error);
                alert("삭제 중 오류가 발생했습니다.");
            }
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
                            isThread={true}
                            onDelete={threadDeleteHandler}
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
                                        currentUser={currentUser}
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

export default ThreadGrid;
