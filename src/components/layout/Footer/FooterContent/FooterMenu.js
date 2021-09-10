import styled from "styled-components";

const StyledFooterMenu = styled.div`
    h4 {
        line-height: 1.25rem;
        font-weight: 600;
        font-size: 0.875rem;
        letter-spacing: 0.05em;
    }
    ul {
        margin-top: 1rem;
        li {
            margin-top: 1rem;
            a {
                text-decoration: none;
                color: inherit;
                font-size: 1rem;
                line-height: 1.5rem;
                cursor: pointer;
            }
        }
    }
`;

const FooterMenu = ({ h4, list }) => {
    return (
        <StyledFooterMenu>
            <h4>{h4}</h4>
            <ul>
                {list.map((obj) => (
                    <li>
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
