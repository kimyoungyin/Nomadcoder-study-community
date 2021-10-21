import { orderBy, where } from "@firebase/firestore";
import { atom, selector } from "recoil";

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

export const categoryQuerySelector = selector({
    key: "categoryQuerySelector",
    get: ({ get }) => {
        const category = get(homeCategoryState);
        if (category !== "search" && category !== "all") {
            return where("category", "==", category);
        } else {
            // default
            return null;
        }
    },
});

export const sortQuerySelector = selector({
    key: "sortQuerySelector",
    get: ({ get }) => {
        const sorter = get(homeSortState);
        if (sorter === "popular") {
            return orderBy("likesNum", "desc");
        } else {
            return orderBy("createdAt", "desc");
        }
    },
});

export const isSearchSelector = selector({
    key: "isSearchSelector",
    get: ({ get }) => {
        const category = get(homeCategoryState);
        if (category === "search") {
            return true;
        } else {
            return false;
        }
    },
});
