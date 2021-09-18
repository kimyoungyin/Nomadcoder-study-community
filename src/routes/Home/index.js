import styled from "styled-components";
import HomeHeader from "./HomeHeader";
import HomeMain from "./HomeMain";

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

const Home = () => {
    return (
        <Homelayout>
            <HomeHeader />
            <HomeMain />
        </Homelayout>
    );
};

export default Home;
