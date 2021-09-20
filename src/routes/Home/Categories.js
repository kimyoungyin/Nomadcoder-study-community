import NOMAD_COURSES from "../Courses";
import styled from "styled-components";

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

const Categories = ({ category, onCategoryChange }) => {
    console.log(category);
    const categoryClickHandler = (event) => {
        const {
            currentTarget: { id },
        } = event;
        onCategoryChange(id);
    };
    return (
        <StyledCategories active={category}>
            <h3>카테고리</h3>
            <ul className="category-box">
                <li
                    key={0}
                    className="category"
                    id="all"
                    onClick={categoryClickHandler}
                >
                    <span>#</span> <span>all</span>
                </li>
                {NOMAD_COURSES.map((item, index) => (
                    <li
                        key={index + 1}
                        className="category"
                        id={item.category}
                        onClick={categoryClickHandler}
                    >
                        <span>#</span> <span>{item.category}</span>
                    </li>
                ))}
            </ul>
        </StyledCategories>
    );
};

export default Categories;
