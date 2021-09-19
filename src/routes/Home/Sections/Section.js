import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Card from "../../../components/UI/Card";
import { useState } from "react";

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
    }
    .section-data {
        width: 100%;
        .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: ${(props) => props.theme.grey_910};
            word-break: break-all;
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
    section: { isMain, up, title, category, owner, createdAt, comments },
}) => {
    const [isLiked, setIsLiked] = useState(false);
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
        <SectionCard as="section" isMain={isMain} isLiked={isLiked}>
            <div
                className="section-likeBox"
                onClick={() => setIsLiked((isLiked) => !isLiked)}
            >
                <FontAwesomeIcon icon={faAngleUp} />
                <div>{up}</div>
            </div>
            <div className="section-data">
                <div className="section-title" onClick={() => {}}>
                    {title}
                </div>
                <div className="section-descriptions">
                    <div className="section-category">
                        in{" "}
                        <a href onClick={() => {}}>
                            #{category}
                        </a>
                    </div>
                    <div className="section-owner">
                        by{" "}
                        <a href onClick={() => {}}>
                            {owner.username}
                        </a>
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
                src={owner.avatarUrl}
                alt={owner.username}
                onClick={() => {}}
            />
        </SectionCard>
    );
};

export default Section;
