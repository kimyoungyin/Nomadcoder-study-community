import styled from "styled-components";

const StyledFooterBottom = styled.div`
    border-top: 1px solid rgba(229, 231, 235, 1); //opacity var
    padding-top: 2rem;
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    .social-links {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        a {
            text-decoration: none;
            color: inherit;
        }
    }
    p {
        text-align: left;
        line-height: 1.5rem;
        font-size: 1rem;
    }
    @media (max-width: 768px) {
        display: block;
        p {
            margin-top: 2rem;
            text-align: center;
        }
    }
`;

const FooterBottom = () => {
    return (
        <StyledFooterBottom>
            <div className="social-links">
                <a href="https://www.instagram.com/nomad_coders/">Instargram</a>
                <a href="https://www.youtube.com/channel/UCUpJs89fSBXNolQGOYKn0YQ">
                    Youtube
                </a>
                <a href="https://www.facebook.com/nomadcoders">Facebook</a>
                <a href="https://github.com/serranoarevalo">Github</a>
            </div>
            <p>© 2017-2021 Nomad Coders. All rights reserved.</p>
        </StyledFooterBottom>
    );
};

export default FooterBottom;
