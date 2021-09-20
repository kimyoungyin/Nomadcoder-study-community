import { faBolt, faFire, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledFilter = styled.div`
    margin-bottom: 1rem;
    margin-top: -2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .filter-type {
        display: flex;
        align-items: center;
        span {
            margin-right: 0.5rem;
        }
        button {
            background-color: inherit;
            border: none;
            padding: 1px 0.5rem;
            margin-right: 0.25rem;
            &.${(props) => props.type} {
                &,
                path {
                    font-weight: 500;
                    color: ${(props) => props.theme.blue_light};
                }
            }
        }
    }
`;

const Filter = ({ type, onTypeChange }) => {
    return (
        <StyledFilter type={type}>
            <div className="filter-type">
                <span>Sort by</span>
                <button
                    className="popular"
                    onClick={() => onTypeChange("popular")}
                >
                    <FontAwesomeIcon icon={faFire} />
                    Popular
                </button>
                <button className="new" onClick={() => onTypeChange("new")}>
                    <FontAwesomeIcon icon={faBolt} />
                    New
                </button>
            </div>
            <a href>
                <FontAwesomeIcon icon={faSearch} />
                Search
            </a>
        </StyledFilter>
    );
};

export default Filter;
