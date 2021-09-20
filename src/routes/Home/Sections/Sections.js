import { useState } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import Section from "./Section";

const SectionsGrid = styled.div`
    grid-area: Sections;
`;

const Sections = ({ filteredSections }) => {
    const [type, setType] = useState("new");

    const sortSections = (a, b) => {
        if (a.isMain) return -1;
        if (type === "new") {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt === b.createdAt) return 0;
            if (a.createdAt < b.createdAt) return 1;
        }
        if (type === "popular") {
            if (a.up > b.up) return -1;
            if (a.up === b.up) return 0;
            if (a.up < b.up) return 1;
        }
    };

    const sortedSections = filteredSections.sort(sortSections);

    const typeChangeHandler = (newType) => {
        setType(newType);
    };

    return (
        <SectionsGrid>
            <Filter type={type} onTypeChange={typeChangeHandler} />
            {sortedSections.map((section, index) => (
                <Section key={index} section={section} />
            ))}
        </SectionsGrid>
    );
};

export default Sections;
