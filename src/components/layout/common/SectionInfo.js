import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    runTransaction,
} from "@firebase/firestore";
import { db } from "../../../fb";
import styled from "styled-components";
import LikeButton from "./LikeButton";
import useTerm from "../../../Hooks/useTerm";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/authRecoil";

const SectionInfoLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .section-data {
        width: 100%;
        .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: ${(props) => props.theme.grey_910};
            word-break: break-all;
            span,
            path {
                color: #34d399;
            }
            span {
                font-size: 0.875rem;
                margin-left: 0.5rem;
            }
            path {
                font-size: 0.75rem;
            }
        }
        .section-descriptions {
            * {
                color: #4b5563;
            }
            margin-top: 0.375rem;
            display: flex;
            flex-wrap: wrap;
            font-size: 0.875rem;
            color: "#4b5563";
            .section-category a {
                background-color: ${(props) => props.theme.grey_500};
                color: white;
                font-weight: 600;
                padding: 0 0.25rem 0.125rem 0.25rem;
                margin-right: 0.25rem;
            }
            .section-owner a {
                font-weight: 600;
            }
            .section-dot {
                margin: 0 0.375rem;
            }
            .section-comments span {
                font-size: 1rem;
                font-weight: 500;
                margin-left: 0.5rem;
            }
        }
    }

    .section-imgBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            @media (max-width: 768px) {
                display: none;
            }
        }
        svg {
            width: 1rem;
            height: 1rem;
            margin-right: 0.25rem;
        }
        .section-deleteOrEdit {
            margin-top: 1.25rem;
            display: flex;
            justify-content: space-between;
            & > div,
            a {
                display: flex;
                align-items: center;
                padding: 0.25rem;
                font-size: 0.75rem;
                font-weight: 500;
                cursor: pointer;
                span,
                svg > path {
                    line-height: 1.5;
                    color: white;
                }
            }
            .section-delete {
                margin-right: 1rem;
                background-color: #ef4444;
            }
            .section-edit {
                background-color: #fde047;
            }
        }
    }
    .section-title,
    a,
    img {
        cursor: pointer;
    }
`;

const SectionInfo = ({ section, isThread = false, onDelete }) => {
    const { uid } = useRecoilValue(authState);
    const [isLiked, setIsLiked] = useState(section.likes.includes(uid));
    const [likedNumber, setLikedNumber] = useState(section.likesNum);
    const [commentsNumber, setCommentsNumber] = useState(0);
    const history = useHistory();
    const term = useTerm(section.createdAt);
    const docRef = doc(db, "threads", section.docId);
    const commentsRef = collection(db, "threads", section.docId, "comments");

    useEffect(() => {
        const getComments = async () => {
            const commentsSnap = await getDocs(commentsRef);
            setCommentsNumber(commentsSnap.size);
        };
        getComments();
    }, [commentsRef, isLiked]);

    const checkLikeStateAndRunTransactionHandler = async () => {
        if (!uid) {
            alert("로그인 하시면 추천할 수 있어요!");
            return history.push("/join");
        }
        if (!isLiked) {
            setIsLiked(true);
            setLikedNumber((prev) => prev + 1);
        } else if (isLiked) {
            setIsLiked(false);
            setLikedNumber((prev) => prev - 1);
        }
        try {
            await runTransaction(db, async (transaction) => {
                const sectionDoc = await transaction.get(docRef);
                if (!sectionDoc.exists()) {
                    throw new Error("해당 글이 존재하지 않습니다");
                }
                if (!isLiked) {
                    const newLikesNum = sectionDoc.data().likesNum + 1;
                    transaction.update(docRef, {
                        likesNum: newLikesNum,
                        likes: arrayUnion(uid),
                    });
                } else if (isLiked) {
                    const newLikesNum = sectionDoc.data().likesNum - 1;
                    transaction.update(docRef, {
                        likesNum: newLikesNum,
                        likes: arrayRemove(uid),
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SectionInfoLayout>
            <LikeButton
                onLikeTransaction={checkLikeStateAndRunTransactionHandler}
                likedNumber={likedNumber}
                isLiked={isLiked}
            />
            <div className="section-data">
                <Link to={`/thread/${section.docId}`} className="section-title">
                    {section.title}{" "}
                    {section.isPinned && (
                        <span>
                            <FontAwesomeIcon icon={faThumbtack} /> Pinned
                        </span>
                    )}
                </Link>
                <div className="section-descriptions">
                    <div className="section-category">
                        in{" "}
                        <Link to={`/${section.category}`}>
                            #{section.category}
                        </Link>
                    </div>
                    <div className="section-owner">
                        by{" "}
                        <Link to={`/users/${section.owner.displayName}`}>
                            {section.owner.displayName}
                        </Link>
                    </div>
                    <span className="section-dot">•</span>
                    <div>{term}</div>
                    <span className="section-dot">•</span>
                    <div className="section-comments">
                        💬 <span>{commentsNumber}</span>
                    </div>
                </div>
            </div>
            <div className="section-imgBox">
                <img
                    src={section.owner.photoURL}
                    alt={section.owner.displayName}
                    onClick={() => {}}
                />
                {isThread && uid === section.owner.displayName && (
                    <div className="section-deleteOrEdit">
                        <div className="section-delete" onClick={onDelete}>
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                            <span>Delete</span>
                        </div>
                        <Link
                            className="section-edit"
                            to={(location) => `${location.pathname}/edit`}
                        >
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                            </svg>
                            <span>Edit</span>
                        </Link>
                    </div>
                )}
            </div>
        </SectionInfoLayout>
    );
};

export default SectionInfo;
