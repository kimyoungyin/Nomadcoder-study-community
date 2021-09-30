import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    arrayRemove,
    arrayUnion,
    doc,
    runTransaction,
} from "@firebase/firestore";
import { db } from "../../../fb";
import styled from "styled-components";

const SectionInfoLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .section-likeBox {
        background-color: white;
        border: 2px solid ${(props) => (props.isLiked ? "#10b981" : "#d1d5db")};
        * {
            color: ${(props) =>
                props.isLiked ? "#10b981" : props.theme.grey_900};
        }
        border-radius: 0.375rem;
        margin-right: 1.25rem;
        padding: 0 0.75rem;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
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
    img {
        width: 3.5rem;
        border-radius: 50%;
    }
    .section-likeBox,
    .section-title,
    a,
    img {
        cursor: pointer;
    }
`;

const SectionInfo = ({ section, displayName }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likedNumber, setLikedNumber] = useState(section.likesNum);
    const history = useHistory();
    const docRef = doc(db, "threads", section.docId);

    useEffect(() => {
        const getArray = [...section.likes];
        const check = getArray.includes(displayName);
        setIsLiked(check);
    }, []);

    const handleLikeData = async () => {
        if (!displayName) {
            alert("로그인 하시면 추천할 수 있어요!");
            return history.push("/join");
        }
        try {
            await runTransaction(db, async (transaction) => {
                const sectionDoc = await transaction.get(docRef);
                if (!sectionDoc.exists()) {
                    throw "해당 글이 존재하지 않습니다";
                }
                if (!isLiked) {
                    setIsLiked(true);
                    setLikedNumber((prev) => prev + 1);
                    const newLikesNum = sectionDoc.data().likesNum + 1;
                    transaction.update(docRef, {
                        likesNum: newLikesNum,
                        likes: arrayUnion(displayName),
                    });
                } else if (isLiked) {
                    setIsLiked(false);
                    setLikedNumber((prev) => prev - 1);
                    const newLikesNum = sectionDoc.data().likesNum - 1;
                    transaction.update(docRef, {
                        likesNum: newLikesNum,
                        likes: arrayRemove(displayName),
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const calculateTerm = (createdAt) => {
        const gap = Date.now() - createdAt;
        const MILLISECOND_PER_MINUTE = 60000;
        const MILLISECOND_PER_HOUR = MILLISECOND_PER_MINUTE * 60;
        const MILLISECOND_PER_DAY = MILLISECOND_PER_HOUR * 24;
        const MILLISECOND_PER_WEEK = MILLISECOND_PER_DAY * 7;

        if (gap >= MILLISECOND_PER_WEEK) {
            return `${Math.floor(gap / MILLISECOND_PER_WEEK)} weeks ago`;
        } else if (gap >= MILLISECOND_PER_DAY) {
            return `${Math.floor(gap / MILLISECOND_PER_DAY)} days ago`;
        } else if (gap >= MILLISECOND_PER_HOUR) {
            return `${Math.floor(gap / MILLISECOND_PER_HOUR)} hours ago`;
        } else {
            return `${Math.floor(gap / MILLISECOND_PER_MINUTE)} minutes ago`;
        }
    };
    return (
        <SectionInfoLayout isLiked={isLiked}>
            <div className="section-likeBox" onClick={handleLikeData}>
                <FontAwesomeIcon icon={faAngleUp} />
                <div>{likedNumber}</div>
            </div>
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
                    <div>{calculateTerm(section.createdAt)}</div>
                    <span className="section-dot">•</span>
                    <div className="section-comments">
                        💬 <span>{section.comments.length}</span>
                    </div>
                </div>
            </div>
            <img
                src={section.owner.photoURL}
                alt={section.owner.displayName}
                onClick={() => {}}
            />
        </SectionInfoLayout>
    );
};

export default SectionInfo;
