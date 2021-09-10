import styled from "styled-components";
import { footerMenu1, FooterMenu2 } from "./Data";
import FooterMenu from "./FooterMenu";

const StyledFooterContent = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
    background-color: gold;
    .info {
        background-color: blue;
        grid-column: 1 /3;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        display: grid;
        gap: 3.5rem;
        .title {
            background-color: purple;
        }
        .menu {
            background-color: palevioletred;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem;
        }
    }
    .logo {
        background-color: paleturquoise;
    }
`;

const FooterContent = () => {
    return (
        <StyledFooterContent>
            <div className="info">
                <div className="title">NOMAD CODER COMMUNITY</div>
                <div className="menu">
                    <FooterMenu h4="Navigation" list={footerMenu1} />
                    <FooterMenu h4="LEGAL" list={FooterMenu2} />
                </div>
            </div>
            <div className="logo">
                <img src="https://nomadcoders.co/m-gray.svg" alt="" />
                <span>Clone Startups. Learn to Code</span>
            </div>
        </StyledFooterContent>
    );
};
export default FooterContent;
