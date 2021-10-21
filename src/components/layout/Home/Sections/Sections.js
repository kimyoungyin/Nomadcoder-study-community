import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { db } from "../../../../fb";
import { authState } from "../../../../recoil/authRecoil";
import {
    currentPageState,
    isSearchSelector,
    homeSortState,
    searchInputState,
    sortQuerySelector,
    categoryQuerySelector,
} from "../../../../recoil/homeRecoil";
import EmptySection from "./EmptySection";
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
    const isSearch = useRecoilValue(isSearchSelector);
    const currentSearchInput = useRecoilValue(searchInputState);
    const currentPage = useRecoilValue(currentPageState);
    const user = useRecoilValue(authState);
    const sorter = useRecoilValue(homeSortState);
    const sortQuery = useRecoilValue(sortQuerySelector);
    const categoryQuery = useRecoilValue(categoryQuerySelector);
    const [pagedSections, setPagedSections] = useState([]);

    const checkedSectionsPage = pagedSections[currentPage - 1];
    const isNextPage = pagedSections[currentPage] !== undefined;
    const SECTIONS_NUMBER_IN_PAGE = 10;
    const threadsRef = collection(db, "threads");
    const pinQuery = orderBy("isPinned", "desc");
    let q;

    if (isSearch) {
        q = query(threadsRef, sortQuery);
    } else if (sorter === "popular") {
        if (categoryQuery !== null) {
            q = query(threadsRef, categoryQuery, sortQuery);
        } else {
            q = query(threadsRef, sortQuery);
        }
    } else {
        if (categoryQuery !== null) {
            q = query(threadsRef, categoryQuery, pinQuery, sortQuery);
        } else {
            q = query(threadsRef, pinQuery, sortQuery);
        }
    }

    const makePagedSections = useCallback(
        (rawArray) => {
            let result = [];
            const totalPages = Math.ceil(
                rawArray.length / SECTIONS_NUMBER_IN_PAGE
            );

            const divideSections = (totalSections, unitNum, totalPages) => {
                let divided = [];
                let start = 0;
                let end = unitNum;
                for (let i = 0; i < totalPages; i++) {
                    divided.push(totalSections.slice(start, end));
                    start += unitNum;
                    end += unitNum;
                }
                return divided;
            };

            if (!isSearch || currentSearchInput !== "") {
                result = divideSections(
                    rawArray,
                    SECTIONS_NUMBER_IN_PAGE,
                    totalPages
                );
            }
            return result;
        },
        [isSearch, currentSearchInput]
    );

    useEffect(() => {
        let currnetSnapShot;
        if (!isSearch) {
            currnetSnapShot = onSnapshot(q, (snap) => {
                const data = snap.docs.map((doc) => {
                    return {
                        docId: doc.id,
                        ...doc.data(),
                    };
                });
                setPagedSections(makePagedSections(data));
            });
        } else {
            currnetSnapShot = onSnapshot(q, (snap) => {
                if (currentSearchInput !== "") {
                    const data = snap.docs
                        .filter((doc) =>
                            doc.data().title.includes(currentSearchInput)
                        )
                        .map((doc) => ({ docId: doc.id, ...doc.data() }));
                    setPagedSections(makePagedSections(data));
                }
            });
        }
        console.log("hi");
        return () => {
            currnetSnapShot();
            setPagedSections([]);
        };
    }, [
        categoryQuery,
        sortQuery,
        isSearch,
        currentSearchInput,
        makePagedSections,
    ]);

    const getLinkUrl = (location, currentPage, isNext) => {
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
            {checkedSectionsPage !== undefined ? (
                checkedSectionsPage.map((section) => (
                    <Section
                        key={section.docId}
                        section={section}
                        displayName={user ? user.displayName : null}
                    />
                ))
            ) : (
                <EmptySection />
            )}
            <div className="page-controller">
                {currentPage > 1 && checkedSectionsPage && (
                    <Link
                        to={(location) =>
                            getLinkUrl(location, currentPage, false)
                        }
                    >
                        ← Previous page
                    </Link>
                )}
                {isNextPage && (
                    <Link
                        to={(location) =>
                            getLinkUrl(location, currentPage, true)
                        }
                    >
                        Next page →
                    </Link>
                )}
            </div>
        </StyledSections>
    );
};

export default Sections;
