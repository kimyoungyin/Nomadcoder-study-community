import styled from "styled-components";
import StyledFooterHeading from "../UI/StyledFooterHeading";

const StyledFooterMenu = styled.div`
    ul {
        margin-top: 1rem;
        li {
            margin-top: 1rem;
            a {
                color: inherit;
                font-size: 1rem;
                cursor: pointer;
                /* &:hover {
                    color: ${(props) => props.theme.grey_hover};
                } */
            }
        }
    }
`;

const FooterMenu = ({ h4, list }) => {
    return (
        <StyledFooterMenu>
            <StyledFooterHeading>{h4}</StyledFooterHeading>
            <ul>
                {list.map((obj) => (
                    <li key={obj.text}>
                        <a href={`https://nomadcoders.co/${obj.route}`}>
                            {obj.text}
                        </a>
                    </li>
                ))}
            </ul>
        </StyledFooterMenu>
    );
};

export default FooterMenu;
