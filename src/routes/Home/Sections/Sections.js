import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { sectionsSelector } from "../../../recoil/homeRecoil";
import Section from "./Section";
import Sorter from "./Sorter";

const SectionsGrid = styled.div`
    grid-area: Sections;
`;

const Sections = () => {
    const processedSections = useRecoilValue(sectionsSelector);

    return (
        <SectionsGrid>
            <Sorter />
            {processedSections.map((section, index) => (
                <Section key={index} section={section} />
            ))}
        </SectionsGrid>
    );
};

export default Sections;
