import styled from "styled-components";
import Card from "../../../components/UI/Card";

const SectionCard = styled(Card)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .section-likeBox {
        background-color: white;
        border: 1px solid grey;
        margin-right: 1.25rem;
    }
    .section-data {
        width: 100%;
        .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: ${(props) => props.theme.grey_hover};
            word-break: break-all;
        }
        .section-descriptions {
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
            }
        }
    }
    img {
        width: 3.5rem;
        border-radius: 50%;
    }
`;

const Section = ({
    section: { isMain, up, title, category, owner, createdAt, comments },
}) => {
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
        <SectionCard as="section" isMain={isMain}>
            <button className="section-likeBox">
                <div>{up}</div>
            </button>
            <div className="section-data">
                <div className="section-title">{title}</div>
                <div className="section-descriptions">
                    <div className="section-category">
                        in <a>#{category}</a>
                    </div>
                    <div className="section-owner">
                        by <a>{owner.username}</a>
                    </div>
                    <span className="section-dot">•</span>
                    <div>{calculateTerm(createdAt)}</div>
                    <span className="section-dot">•</span>
                    <div className="section-comments">
                        💬 <span>{comments.length}</span>
                    </div>
                </div>
            </div>
            <img src={owner.avatarUrl} alt={owner.username} />
        </SectionCard>
    );
};

export default Section;
