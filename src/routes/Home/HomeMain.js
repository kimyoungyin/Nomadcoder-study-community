import DUMMY_SECTIONS from "./Sections/dummyData";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import Categories from "./Categories";
import Sections from "./Sections/Sections";
import { useState } from "react";

const HomeMainLayout = styled.main`
    padding: 0 2rem 10rem;
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: "Categories Sections Sections Sections Button";
    gap: 3.5rem;
    @media ${(props) => props.theme.mobile} {
        grid-template-columns: 1fr;
        grid-template-areas:
            "Categories"
            "Sections"
            "Button";
    }
`;

const ButtonGrid = styled.div`
    grid-area: Button;
    button {
        width: 100%;
        background-color: ${(props) => props.theme.blue_light};
    }
`;

const HomeMain = () => {
    const [categoryFilter, setCategoryFilter] = useState("all");
    const filterSections = (category) => {
        if (category === "all") {
            return DUMMY_SECTIONS;
        } else {
            return DUMMY_SECTIONS.filter(
                (section) => section.category === category
            );
        }
    };
    return (
        <HomeMainLayout>
            <Categories
                category={categoryFilter}
                onCategoryChange={setCategoryFilter}
            />
            <Sections filteredSections={filterSections(categoryFilter)} />
            <ButtonGrid>
                <Button shadow="md" fw={400} py={2} onClick={() => {}}>
                    {/* upload route로 이동 */}
                    <span>글쓰기</span>
                </Button>
            </ButtonGrid>
        </HomeMainLayout>
    );
};

export default HomeMain;
