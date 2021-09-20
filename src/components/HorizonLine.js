import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    width: 100%;
    text-align: center;
    border: none;
    border-bottom: 2px solid ${props=>props.theme.grey_400};
    line-height: 0.1em;
    margin: 10px 0 20px;

    span {
      background-color: white;
      padding: 0 10px;
    }
  `


const HorizonLine = ({ text }) => {
  return (
    <Container>
      <span>{text}</span>
    </Container>
  );
};

export default HorizonLine;