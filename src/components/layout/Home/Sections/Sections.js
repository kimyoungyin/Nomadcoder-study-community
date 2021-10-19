import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { db } from "../../../../fb";
import { authState } from "../../../../recoil/authRecoil";
import {
    currentPageState,
    homeCategoryState,
    homeSortState,
    searchInputState,
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
    const currentCategory = useRecoilValue(homeCategoryState);
    const currentSorter = useRecoilValue(homeSortState);
    const currentSearchInput = useRecoilValue(searchInputState);
    const currentPage = useRecoilValue(currentPageState);
    const user = useRecoilValue(authState);
    const [pagedSections, setPagedSections] = useState([]);

    const checkedSectionsPage = pagedSections[currentPage - 1];
    const isNextPage = pagedSections[currentPage] !== undefined;

    useEffect(() => {
        const SECTIONS_NUMBER_IN_PAGE = 10;
        // set query condition
        const threadsRef = collection(db, "threads");
        const pinQuery = orderBy("isPinned", "desc");
        let categoryQuery = null;
        let isSearch = false;
        let sortQuery = orderBy("createdAt", "desc");
        let isPinnedRequired = false;
        let currnetSnapShot;
        if (currentCategory === "search") {
            isSearch = true;
        } else if (currentCategory !== "all") {
            categoryQuery = where("category", "==", currentCategory);
        }

        if (currentSorter !== "popular") {
            isPinnedRequired = true;
        } else {
            sortQuery = orderBy("likesNum", "desc");
        }

        // set final query divided by isPinnedRequired
        let q = null;
        if (isPinnedRequired) {
            q =
                categoryQuery !== null
                    ? query(threadsRef, categoryQuery, pinQuery, sortQuery)
                    : query(threadsRef, pinQuery, sortQuery);
        } else {
            q =
                categoryQuery !== null
                    ? query(threadsRef, categoryQuery, sortQuery)
                    : query(threadsRef, sortQuery);
        }

        // define fetching data function by query
        const processPinnedOrNot = (makePagedSections) => {
            currnetSnapShot = onSnapshot(q, (snap) => {
                const data = snap.docs.map((doc) => {
                    return {
                        docId: doc.id,
                        ...doc.data(),
                    };
                });
                makePagedSections(data);
            });
        };

        // define callback pagination funciton
        const makePagedSections = (rawArray) => {
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
            setPagedSections(result);
        };

        // decide returning value
        if (!isSearch) {
            processPinnedOrNot(makePagedSections);
        } else if (
            (currnetSnapShot = onSnapshot(
                query(threadsRef, sortQuery),
                (snap) => {
                    if (currentSearchInput === "") {
                        setPagedSections([]);
                    } else {
                        const data = snap.docs
                            .filter((doc) =>
                                doc.data().title.includes(currentSearchInput)
                            )
                            .map((doc) => ({ docId: doc.id, ...doc.data() }));
                        makePagedSections(data);
                    }
                }
            ))
        )
            return () => {
                currnetSnapShot();
            };
    }, [
        currentCategory,
        currentSorter,
        currentSearchInput,
        currentPage,
        pagedSections,
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
