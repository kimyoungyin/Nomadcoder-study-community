import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
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
import LikeButton from "./LikeButton";
import useTerm from "../../../Hooks/useTerm";

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
    img {
        width: 3.5rem;
        border-radius: 50%;
    }
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
    const term = useTerm(section.createdAt);
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

    return (
        <SectionInfoLayout>
            <LikeButton
                onChangeLikeData={handleLikeData}
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
                    {/* subcollection 참조 만들 예정 */}
                    {/* <div className="section-comments">
                        💬 <span>{section.comments.length}</span>
                    </div> */}
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
