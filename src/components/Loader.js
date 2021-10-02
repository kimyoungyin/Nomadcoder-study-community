import React from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const GreyBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.1;
  z-index: 1;
`;

const Logo = styled.img`
  width: ${(props) => `${props.width}rem`};

  z-index: 2;

  @keyframes rotateAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: rotateAnimation 2s linear infinite;
`;

function Loader({ width }) {
  return (
    <Container>
      <GreyBackground />
      <Logo src={logo} alt="loading" width={width} />
    </Container>
  );
}

export default Loader;
