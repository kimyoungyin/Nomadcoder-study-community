import { atom, selector } from "recoil";
import DUMMY_SECTIONS from "../routes/Home/Sections/dummyData";

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

// 더미 데이터가 아니라 firebase로 가져올 때 sections를 atom으로 받아올 예정

export const sectionsSelector = selector({
    key: "sections",
    get: ({ get }) => {
        const category = get(homeCategoryState);
        const sorter = get(homeSortState);
        const searchInput = get(searchInputState);

        const sortSections = (a, b) => {
            if (a.isMain) return -1;
            if (sorter === "new") {
                if (a.createdAt > b.createdAt) return -1;
                if (a.createdAt === b.createdAt) return 0;
                if (a.createdAt < b.createdAt) return 1;
            }
            if (sorter === "popular") {
                if (a.up > b.up) return -1;
                if (a.up === b.up) return 0;
                if (a.up < b.up) return 1;
            }
        };

        let filteredSections = [];
        if (category === "search") {
            filteredSections = searchInput
                ? DUMMY_SECTIONS.filter((obj) =>
                      obj.title.includes(searchInput)
                  )
                : [];
            // console.log(filteredSections);
        } else if (category === "all") {
            filteredSections = [...DUMMY_SECTIONS];
        } else {
            filteredSections = DUMMY_SECTIONS.filter(
                (obj) => obj.category === category
            );
        }
        const processedSections = filteredSections.sort(sortSections);
        return processedSections;
    },
});
