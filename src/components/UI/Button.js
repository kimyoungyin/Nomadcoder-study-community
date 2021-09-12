import React from 'react';
import styled from 'styled-components';

const shadow = {
  sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
  md: '0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)',
};

const Button = styled.button`
  background-color: ${(props) =>
    props.background ||
    '#2563EB'}; // theme 파일 merge 후, default color 변경 예정
  color: ${(props) => props.color || 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: ${(props) => shadow[props.shadow]};
  width: ${(props) => props.width};
  border: none;
  font-weight: ${(props) => props.fw || 500};
  font-size: ${(props) => props.fs || '1rem'};
  padding-left: ${(props) => (props.px ? `${props.px * 0.25}rem` : '')};
  padding-right: ${(props) => (props.px ? `${props.px * 0.25}rem` : '')};
  padding-top: ${(props) => (props.py ? `${props.py * 0.25}rem` : '')};
  padding-bottom: ${(props) => (props.py ? `${props.py * 0.25}rem` : '')};

  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
`;

export default Button;
