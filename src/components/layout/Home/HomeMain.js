import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Button from "../../UI/Button";
import { authState } from "../../../recoil/authRecoil";
import Categories from "./Categories";
import SectionGrid from "./Sections/SectionGrid";

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

const HomeMain = ({ courses }) => {
    const user = useRecoilValue(authState);

    const checkLoggedinHandler = () => {
        if (!user) alert("로그인 후 글쓰기가 가능합니다.");
    };

    return (
        <HomeMainLayout>
            <Categories courses={courses} />
            <SectionGrid />
            <ButtonGrid>
                <Link to="/post" onClick={checkLoggedinHandler}>
                    <Button shadow="md" fw={400} py={2}>
                        <span>글쓰기</span>
                    </Button>
                </Link>
            </ButtonGrid>
        </HomeMainLayout>
    );
};

export default HomeMain;
