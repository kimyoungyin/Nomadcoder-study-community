import styled from "styled-components";
import DUMMY_SECTIONS from "./dummyData";
import Section from "./Section";

const SectionsGrid = styled.div`
    grid-area: Sections;
`;

const Sections = () => {
    console.log(DUMMY_SECTIONS);
    return (
        <SectionsGrid>
            {DUMMY_SECTIONS.map((section, index) => (
                <Section key={index} section={section} />
            ))}
        </SectionsGrid>
    );
};

export default Sections;
