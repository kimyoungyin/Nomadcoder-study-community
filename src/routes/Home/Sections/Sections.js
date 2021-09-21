import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { sectionsState } from "../../../recoil/homeRecoil";
import Filter from "./Filter";
import Section from "./Section";

const SectionsGrid = styled.div`
    grid-area: Sections;
`;

const Sections = () => {
    const processedSections = useRecoilValue(sectionsState);

    return (
        <SectionsGrid>
            <Filter />
            {processedSections.map((section, index) => (
                <Section key={index} section={section} />
            ))}
        </SectionsGrid>
    );
};

export default Sections;
