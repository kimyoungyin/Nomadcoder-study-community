import { faBolt, faFire, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { homeCategoryState, homeSortState } from "../../../recoil/homeRecoil";

const StyledSorter = styled.div`
    margin-bottom: 1rem;
    margin-top: -2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    font-size: 0.875rem;
    a {
        color: ${(props) => props.theme.grey_400};
    }
    svg {
        margin: 0 0.3rem;
    }
    .sorter-type {
        display: flex;
        align-items: center;
        span {
            margin-right: 0.5rem;
        }
        a {
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

const Sorter = ({ type, onTypeChange }) => {
    const sorter = useRecoilValue(homeSortState);
    const category = useRecoilValue(homeCategoryState);
    return (
        <StyledSorter type={sorter}>
            <div className="sorter-type">
                <span>Sort by</span>
                <Link to={`/${category}?sort=popular`} className="popular">
                    <FontAwesomeIcon icon={faFire} />
                    Popular
                </Link>
                <Link to={`/${category}`} className="new">
                    <FontAwesomeIcon icon={faBolt} />
                    New
                </Link>
            </div>
            <Link to="/search">
                <FontAwesomeIcon icon={faSearch} />
                Search
            </Link>
        </StyledSorter>
    );
};

export default Sorter;
