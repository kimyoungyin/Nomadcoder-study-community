import Card from "../../../UI/Card";
import SectionInfo from "../../common/SectionInfo";

const Section = ({ section, displayName }) => {
    return (
        <Card as="section" isMain={section.isPinned}>
            <SectionInfo section={section} displayName={displayName} />
        </Card>
    );
};

export default Section;
