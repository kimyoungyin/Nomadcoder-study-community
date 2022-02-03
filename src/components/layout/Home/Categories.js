import styled from "styled-components";
import { Link } from "react-router-dom";
import { homeCategoryState } from "../../../recoil/homeRecoil";
import { useRecoilValue } from "recoil";

const StyledCategories = styled.aside`
    grid-area: Categories;
    h3 {
        font-weight: 500;
        color: ${(props) => props.theme.grey_800};
        padding: 0 1.25rem;
        margin-bottom: 0.75rem;
    }
    .category-box {
        cursor: pointer;
        .category {
            font-size: 0.875rem;
            padding: 0.25rem 0;
            margin-bottom: 0.25rem;
            display: flex;
            width: 100%;
            span {
                color: black;
            }
            & > span:first-child {
                margin-left: 1.25rem;
            }
            & > span:nth-child(2) {
                margin-left: 0.75rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
            }
        }
        .category#${(props) => props.active} {
            background-color: ${(props) => props.theme.blue_light};
            border-radius: 1rem;
            font-weight: 700;
            span {
                color: white;
            }
        }
    }
`;

const Categories = ({ courses }) => {
    const category = useRecoilValue(homeCategoryState);
    // 카테고리별 글 개수도 firebase 사용 시 추가할 예정
    return (
        <StyledCategories active={category}>
            <h3>카테고리</h3>
            <div className="category-box">
                <Link to="/" key={0} className="category" id="all">
                    <span>#</span> <span>all</span>
                </Link>
                {courses.map((item, index) => (
                    <Link
                        to={`/${item.category}`}
                        key={index + 1}
                        className="category"
                        id={item.category}
                    >
                        <span>#</span> <span>{item.category}</span>
                    </Link>
                ))}
            </div>
        </StyledCategories>
    );
};

export default Categories;
