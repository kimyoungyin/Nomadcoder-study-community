import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookSquare,
    faGithub,
    faInstagram,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const StyledFooterBottom = styled.div`
    border-top: 1px solid ${(props) => props.theme.grey_border};
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
            font-size: 1.33333em;
            &:hover path {
                color: ${(props) => props.theme.grey_hover};
            }
        }
    }
    p {
        text-align: left;
        font-size: 1rem;
        color: ${(props) => props.theme.grey_400};
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
                <a href="https://www.instagram.com/nomad_coders/">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.youtube.com/channel/UCUpJs89fSBXNolQGOYKn0YQ">
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="https://www.facebook.com/nomadcoders">
                    <FontAwesomeIcon icon={faFacebookSquare} />
                </a>
                <a href="https://github.com/serranoarevalo">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
            <p>© 2017-2021 Nomad Coders. All rights reserved.</p>
        </StyledFooterBottom>
    );
};

export default FooterBottom;
