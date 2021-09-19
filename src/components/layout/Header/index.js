import React from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button';
import logo from '../../../logo.svg';
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
  
  padding: 0 15rem;

  @media ${props=>props.theme.tablet} {
    padding: 0 1.5rem;
  }
`;

const Logo = styled.img`
  width: 2.5rem;
`;

const LogoWrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function Header() {
  return (
    <Container>
      <PaddingWrapper>
        <LogoWrapper>
          <Logo src={logo} alt="" />
        </LogoWrapper>
        <ButtonWrapper>
          <Button px={8} py={2} background="transparent">Login</Button> 
          <Button  px={8} py={2} color="white">
          <span>Join</span> 
          </Button>
        </ButtonWrapper>
      </PaddingWrapper>
    </Container>
  );
}

export default Header;
