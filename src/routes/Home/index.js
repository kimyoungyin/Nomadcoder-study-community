import { useEffect } from "react";
import HomeHeader from "./HomeHeader";
import HomeMain from "./HomeMain";
import NOMAD_COURSES from "../Courses";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { homeCategoryState, homeSortState } from "../../recoil/homeRecoil";

const Homelayout = styled.div`
    padding: 7rem 0 8rem;
    @media ${(props) => props.theme.tablet} {
        padding-top: 5rem;
    }
    @media ${(props) => props.theme.mobile} {
        padding-top: 4rem;
    }
    @media (max-width: 640px) {
        padding-top: 3rem;
    }
`;

const Home = ({ match, location }) => {
    const [categoryState, setCategoryState] = useRecoilState(homeCategoryState);
    const setSorter = useSetRecoilState(homeSortState);

    useEffect(() => {
        const categoryParams =
            match.url === "/" ? "all" : match.params.category;

        const sortQuery = location.search
            ? location.search.split("=")[1]
            : "new";

        setSorter(sortQuery);
        setCategoryState(categoryParams);
        console.log("rerendered");
        window.scroll({ top: 0, behavior: "smooth" });
    }, [match.params.category, location.search]);

    return (
        <Homelayout>
            <HomeHeader
                categoryObj={NOMAD_COURSES.find(
                    (obj) => obj.category === categoryState
                )}
            />
            <HomeMain courses={NOMAD_COURSES} />
        </Homelayout>
    );
};

export default Home;
