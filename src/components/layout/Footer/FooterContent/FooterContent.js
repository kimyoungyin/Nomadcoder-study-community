import styled from "styled-components";
import StyledFooterHeading from "../UI/StyledFooterHeading";
import { footerMenu1, FooterMenu2 } from "./Data";
import FooterMenu from "./FooterMenu";

const StyledFooterContent = styled.div`
    display: grid;
    grid-template-areas: "info info logo";
    gap: 2rem;

    @media ${(props) => props.theme.tablet} {
        grid-template-areas:
            "info"
            "logo";
    }

    .info {
        grid-area: info;
        grid-template-areas: "title menuBox";
        @media ${(props) => props.theme.tablet} {
            grid-template-areas:
                "title"
                "menuBox";
        }
        display: grid;
        gap: 3.5rem;
        .description {
            font-size: 0.75rem;
            line-height: 1.5;
        }
        .menuBox {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem;
        }
    }
    .logo {
        grid-area: logo;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 3.5rem;
            height: auto;
            margin-bottom: 2rem;
        }
        span {
            color: ${(props) => props.theme.grey_400};
        }
    }
`;

const FooterContent = () => {
    return (
        <StyledFooterContent>
            <div className="info">
                <div className="description">
                    <StyledFooterHeading>
                        NOMAD CODER COMMUNITY
                    </StyledFooterHeading>
                    유한회사 노마드컴퍼니
                    <br />
                    대표: 박인
                    <br />
                    개인정보책임관리자: 박인
                    <br />
                    사업자번호: 301-88-01666
                    <br />
                    주소: 서울시 마포구 양화로 8길 17-28, 6층 141호
                    <br />
                    -
                    <br />
                    원격평생교육원: 서울시 서부교육지원청(제2020-13호)
                    <br />
                    통신판매업 신고번호: 2020-서울마포-1987
                    <br />
                    이메일: help [@] nomadcoders.co
                </div>
                <div className="menuBox">
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
