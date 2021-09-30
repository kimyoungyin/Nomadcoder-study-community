import styled from "styled-components";
import Card from "../../../components/UI/Card";
import SectionInfo from "../../../components/layout/common/SectionInfo";

const SectionCard = styled(Card)``;

const Section = ({ section, displayName }) => {
    return (
        <SectionCard as="section" isMain={section.isPinned}>
            <SectionInfo section={section} displayName={displayName} />
        </SectionCard>
    );
};

export default Section;
