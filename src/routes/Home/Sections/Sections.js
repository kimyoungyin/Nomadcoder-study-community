import { useRecoilValue } from "recoil";
import { sectionsSelector } from "../../../recoil/homeRecoil";
import Section from "./Section";

const Sections = () => {
    const processedSections = useRecoilValue(sectionsSelector);

    return (
        <>
            {processedSections.map((section, index) => (
                <Section key={index} section={section} />
            ))}
        </>
    );
};

export default Sections;
