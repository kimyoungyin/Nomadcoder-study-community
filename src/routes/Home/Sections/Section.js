import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Card from "../../../components/UI/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../../fb";

const SectionCard = styled(Card)`
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

const Section = ({
    section: {
        docId,
        isPinned,
        likesNum,
        likes,
        title,
        category,
        createdAt,
        owner,
        comments,
    },
    displayName,
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likedNumber, setLikedNumber] = useState(likesNum);
    const docRef = doc(db, "threads", docId);
    useEffect(() => {
        const getArray = [...likes];
        const check = getArray.includes(displayName);
        setIsLiked(check);
    }, []);

    const handleLikeData = async () => {
        if (isLiked) {
            const likesIndex = likes.findIndex((user) => user === displayName);
            if (likesIndex <= -1) return;
            setIsLiked(false);
            setLikedNumber((likedNumber) => likedNumber - 1);
            let updatedLikes = [...likes];
            updatedLikes.splice(likesIndex, 1);
            await updateDoc(docRef, {
                likesNum: likedNumber - 1,
                likes: updatedLikes,
            });
        } else {
            setIsLiked(true);
            setLikedNumber((likedNumber) => likedNumber + 1);
            let updatedLikes = [...likes];
            updatedLikes.push(displayName);
            await updateDoc(docRef, {
                likesNum: likedNumber + 1,
                likes: updatedLikes,
            });
        }
    };

    const calculateTerm = (createdAt) => {
        const gap = Date.now() - createdAt;
        if (gap >= 604800000) {
            return `${Math.floor(gap / 604800000)} weeks ago`;
        } else if (gap >= 86400000) {
            return `${Math.floor(gap / 86400000)} days ago`;
        } else if (gap >= 3600000) {
            return `${Math.floor(gap / 3600000)} hours ago`;
        } else {
            return `${Math.floor(gap / 60000)} minutes ago`;
        }
    };
    return (
        <SectionCard as="section" isMain={isPinned} isLiked={isLiked}>
            <div className="section-likeBox" onClick={handleLikeData}>
                <FontAwesomeIcon icon={faAngleUp} />
                <div>{likedNumber}</div>
            </div>
            <div className="section-data">
                <Link to={`/thread/${docId}`} className="section-title">
                    {title}{" "}
                    {isPinned && (
                        <span>
                            <FontAwesomeIcon icon={faThumbtack} /> Pinned
                        </span>
                    )}
                </Link>
                <div className="section-descriptions">
                    <div className="section-category">
                        in <Link to={`/${category}`}>#{category}</Link>
                    </div>
                    <div className="section-owner">
                        by{" "}
                        <Link to={`/users/${owner.displayName}`}>
                            {owner.displayName}
                        </Link>
                    </div>
                    <span className="section-dot">•</span>
                    <div>{calculateTerm(createdAt)}</div>
                    <span className="section-dot">•</span>
                    <div className="section-comments">
                        💬 <span>{comments.length}</span>
                    </div>
                </div>
            </div>
            <img
                src={owner.photoURL}
                alt={owner.displayName}
                onClick={() => {}}
            />
        </SectionCard>
    );
};

export default Section;
