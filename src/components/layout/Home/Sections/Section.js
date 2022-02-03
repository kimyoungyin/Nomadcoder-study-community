import Card from "../../../UI/Card";
import SectionInfo from "../../common/SectionInfo";

const Section = ({ section }) => {
    return (
        <Card as="section" isMain={section.isPinned}>
            <SectionInfo section={section} />
        </Card>
    );
};

export default Section;
