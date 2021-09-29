import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authState } from "../../../recoil/authRecoil";
import { currentPageState, sectionsSelector } from "../../../recoil/homeRecoil";
import Section from "./Section";

const StyledSections = styled.div`
    .page-controller {
        display: flex;
        gap: 5rem;
        justify-content: center;
        margin-top: 2.5rem;
        a {
            color: ${(props) => props.theme.blue_light};
            font-weight: 500;
        }
    }
`;

const Sections = () => {
    const pagedSections = useRecoilValue(sectionsSelector) || [];
    const currentPage = useRecoilValue(currentPageState);
    const user = useRecoilValue(authState);

    const checkedSectionsPage = pagedSections[currentPage - 1] || [];
    const isNextPage = pagedSections[currentPage] !== undefined;
    const linkUrl = (location, currentPage, isNext) => {
        let toThisPage = isNext
            ? Number(currentPage) + 1
            : Number(currentPage) - 1;

        if (!location.search) {
            return `?page=${toThisPage}`;
        } else if (location.search.includes(`page=${currentPage}`)) {
            return location.search.replace(
                `page=${currentPage}`,
                `page=${toThisPage}`
            );
        } else {
            return `${location.search}&page=${toThisPage}`;
        }
    };

    return (
        <StyledSections>
            {checkedSectionsPage.map((section) => (
                <Section
                    key={section.docId}
                    section={section}
                    displayName={user ? user.displayName : null}
                />
            ))}
            <div className="page-controller">
                {currentPage > 1 && (
                    <Link
                        to={(location) => linkUrl(location, currentPage, false)}
                    >
                        ← Previous page
                    </Link>
                )}
                {isNextPage && (
                    <Link
                        to={(location) => linkUrl(location, currentPage, true)}
                    >
                        Next page →
                    </Link>
                )}
            </div>
        </StyledSections>
    );
};

export default Sections;
