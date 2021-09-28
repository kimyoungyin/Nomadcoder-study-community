import {
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from "@firebase/firestore";
import { atom, selector } from "recoil";
import { db } from "../fb";

export const homeCategoryState = atom({
    key: "homeCategory",
    default: "all",
});

export const homeSortState = atom({
    key: "homeSorter",
    default: "new",
});

export const searchInputState = atom({
    key: "searchInput",
    default: "",
});

export const currentPageState = atom({
    key: "sectionsPage",
    default: 1,
});

export const sectionsQuerySelector = selector({
    key: "sectionsQuery",
    get: ({ get }) => {
        const category = get(homeCategoryState);
        const sorter = get(homeSortState);
        let categoryQuery = null;
        let isSearch = false;
        let sortQuery = orderBy("createdAt", "desc");
        let isPinnedRequired = false;
        if (category === "search") {
            isSearch = true;
        } else if (category !== "all") {
            categoryQuery = where("category", "==", category);
        }
        if (sorter !== "popluar") {
            isPinnedRequired = true;
        } else {
            sortQuery = orderBy("likesNum", "desc");
        }

        return { categoryQuery, isSearch, sortQuery, isPinnedRequired };
    },
});

const SECTIONS_NUMBER_IN_PAGE = 10;

export const sectionsSelector = selector({
    key: "sections",
    get: async ({ get }) => {
        const sectionsQueryObj = get(sectionsQuerySelector);
        const searchInput = get(searchInputState);

        const { categoryQuery, isSearch, sortQuery, isPinnedRequired } =
            sectionsQueryObj;
        const threadsRef = collection(db, "threads");
        const pinnedQuery = where("isPinned", "==", true);
        const notPinnedQuery = where("isPinned", "==", false);

        let rawSections = [];
        if (isSearch) {
            console.log("search 자리");
            const searchedSections = await getDocs(
                query(threadsRef, sortQuery)
            );
            if (searchInput !== "") {
                searchedSections.forEach((doc) => {
                    if (doc.data().title.includes(searchInput)) {
                        rawSections.push({
                            docId: doc.id,
                            ...doc.data(),
                        });
                    }
                });
            }
        } else if (categoryQuery) {
            console.log("category 자리");
            if (isPinnedRequired) {
                const pinnedSections = await getDocs(
                    query(threadsRef, categoryQuery, pinnedQuery, sortQuery)
                );
                const notPinnedSections = await getDocs(
                    query(threadsRef, categoryQuery, notPinnedQuery, sortQuery)
                );
                pinnedSections.forEach((doc) =>
                    rawSections.push({
                        docId: doc.id,
                        ...doc.data(),
                    })
                );
                notPinnedSections.forEach((doc) =>
                    rawSections.push({
                        docId: doc.id,
                        ...doc.data(),
                    })
                );
            }
        } else {
            console.log("all 자리!");
            const pinnedSections = await getDocs(
                query(threadsRef, pinnedQuery, sortQuery)
            );
            const notPinnedSections = await getDocs(
                query(threadsRef, notPinnedQuery, sortQuery)
            );
            pinnedSections.forEach((doc) =>
                rawSections.push({
                    docId: doc.id,
                    ...doc.data(),
                })
            );
            notPinnedSections.forEach((doc) =>
                rawSections.push({
                    docId: doc.id,
                    ...doc.data(),
                })
            );
        }

        let pagedSections = [];
        const totalPages = Math.ceil(
            rawSections.length / SECTIONS_NUMBER_IN_PAGE
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

        if (!isSearch || searchInput !== "") {
            pagedSections = divideSections(
                rawSections,
                SECTIONS_NUMBER_IN_PAGE,
                totalPages
            );
        }
        return pagedSections;
    },
});
