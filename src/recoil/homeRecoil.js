import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
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

export const sectionsPageState = atom({
    key: "sectionsPage",
    default: 1,
});

export const sectionsSelector = selector({
    key: "sections",
    get: async ({ get }) => {
        const category = get(homeCategoryState);
        const sorter = get(homeSortState);
        const searchInput = get(searchInputState);

        const threadsRef = collection(db, "threads");
        const pinnedCondition = where("isPinned", "==", true);
        const notPinnedCondition = where("isPinned", "==", false);
        let categoryCondition = null;
        let sortCondition = orderBy("createdAt", "desc");
        let pinQuery = null;
        let notPinQuery = null;
        let processedSections = [];

        if (sorter === "popular") {
            sortCondition = orderBy("likesNum", "desc");
        }

        if (category === "all") {
            pinQuery = query(threadsRef, pinnedCondition, sortCondition);
            notPinQuery = query(threadsRef, notPinnedCondition, sortCondition);
        } else {
            categoryCondition = where("category", "==", category);
            pinQuery = query(
                threadsRef,
                categoryCondition,
                pinnedCondition,
                sortCondition
            );
            notPinQuery = query(
                threadsRef,
                categoryCondition,
                notPinnedCondition,
                sortCondition
            );
        }

        if (category !== "search") {
            const pinnedSections = await getDocs(pinQuery);
            const notPinnedSections = await getDocs(notPinQuery);
            pinnedSections.forEach((doc) =>
                processedSections.push({
                    docId: doc.id,
                    ...doc.data(),
                })
            );
            notPinnedSections.forEach((doc) =>
                processedSections.push({
                    docId: doc.id,
                    ...doc.data(),
                })
            );
        } else if (category === "search" && searchInput !== "") {
            const searchSections = await getDocs(threadsRef, sortCondition);
            searchSections.forEach((doc) => {
                if (doc.data().title.includes(searchInput)) {
                    processedSections.push({
                        docId: doc.id,
                        ...doc.data(),
                    });
                }
            });
        }

        console.log(processedSections);
        return processedSections;
    },
});
