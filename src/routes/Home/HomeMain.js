import styled from "styled-components";
import Button from "../../components/UI/Button";
import Categories from "./Categories";
import Sections from "./Sections/Sections";

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
    .upload-button {
        grid-area: Button;
        button {
            width: 100%;
        }
    }
`;

const HomeMain = () => {
    return (
        <HomeMainLayout>
            <Categories />
            <Sections />
            <div className="upload-button">
                <Button shadow="md" fw={400} py={2}>
                    <span>글쓰기</span>
                </Button>
            </div>
        </HomeMainLayout>
    );
};

export default HomeMain;
