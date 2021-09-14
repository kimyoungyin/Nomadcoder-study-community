import styled from "styled-components";
import FooterBottom from "./FooterBottom/FooterBottom";
import FooterContent from "./FooterContent/FooterContent";

const StyledFooter = styled.footer`
    width: 100%;
    margin-top: 5rem;
    .layout {
        padding: 4rem 2rem;
        margin: 0 auto;
        max-width: 1280px;
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <div className="layout">
                <FooterContent />
                <FooterBottom />
            </div>
        </StyledFooter>
    );
};

export default Footer;
