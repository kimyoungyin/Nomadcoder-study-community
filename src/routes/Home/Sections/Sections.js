import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { sectionsState } from "../../../recoil/homeRecoil";
import Section from "./Section";
import Sorter from "./Sorter";

const SectionsGrid = styled.div`
    grid-area: Sections;
`;

const Sections = () => {
    const processedSections = useRecoilValue(sectionsState);

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
