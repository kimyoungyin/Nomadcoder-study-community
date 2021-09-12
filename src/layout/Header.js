import React from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';
const Container = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  height: 4rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const PaddingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`;

const Logo = styled.img`
  width: 2.5rem;
`;

const LogoWrapper = styled.div``;

const MenuWrapper = styled.div`
  display: none;
  @media (max-width: 639px) {
    display: block;
    svg {
      width: 2rem;
      path:nth-child(2) {
        display: none;
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 639px) {
    button:nth-child(1) {
      display: none;
    }
  }
`;

function Header() {
  return (
    <Container>
      <PaddingWrapper>
        <MenuWrapper>
          <svg stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </MenuWrapper>
        <LogoWrapper>
          <Logo src={logo} alt="" />
        </LogoWrapper>
        <ButtonWrapper>
          {/* 로그인,회원가입 기능 연동 후 반응형 추가 예정 */}
          <button>Login</button> {/* Button Component Merge 후 변경 예정 */}
          <button>Join</button>
        </ButtonWrapper>
      </PaddingWrapper>
    </Container>
  );
}

export default Header;
