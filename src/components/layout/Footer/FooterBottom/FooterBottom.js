import styled from "styled-components";

const StyledFooterBottom = styled.div`
    background-color: beige;
    padding-top: 2rem;
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
`;

const FooterBottom = () => {
    return (
        <StyledFooterBottom>
            <p>© 2017-2021 Nomad Coders. All rights reserved.</p>
            <div className="social-links">
                <a
                    rel="noreferrer"
                    href="https://www.instagram.com/nomad_coders/"
                    target="_blank"
                >
                    Instargram
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.facebook.com/nomadcoders"
                    target="_blank"
                >
                    Facebook
                </a>
                <a
                    rel="noreferrer"
                    href="https://github.com/serranoarevalo"
                    target="_blank"
                >
                    Github
                </a>
            </div>
        </StyledFooterBottom>
    );
};

export default FooterBottom;
