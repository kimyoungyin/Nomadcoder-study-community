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
        let q1 = null;
        let q2 = null;
        let processedSections = [];

        if (sorter === "popular") {
            sortCondition = orderBy("likesNum", "desc");
        }

        if (category !== "all") {
            categoryCondition = where("category", "==", category);
            q1 = query(
                threadsRef,
                categoryCondition,
                pinnedCondition,
                sortCondition
            );
            q2 = query(
                threadsRef,
                categoryCondition,
                notPinnedCondition,
                sortCondition
            );
        } else {
            q1 = query(threadsRef, pinnedCondition, sortCondition);
            q2 = query(threadsRef, notPinnedCondition, sortCondition);
        }

        const pinnedSections = await getDocs(q1);
        const notPinnedSections = await getDocs(q2);
        pinnedSections.forEach((doc) =>
            processedSections.push({
                docId: doc.id,
                ...doc.data(),
            })
        );
        console.log(processedSections);
        notPinnedSections.forEach((doc) =>
            processedSections.push({
                docId: doc.id,
                ...doc.data(),
            })
        );
        console.log(processedSections);
        return processedSections;
    },
});
