import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  text-align: center;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.grey_200};
  margin: 10px 0 20px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 0.1rem;

  span {
    background-color: white;
    padding: 0 10px;
    line-height: 0.1rem;
  }
`;

const HorizonLine = ({ text }) => {
  return <Container>{text && <span>{text}</span>}</Container>;
};

export default HorizonLine;
