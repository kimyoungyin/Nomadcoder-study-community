import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.background || props.theme.blue_bold};
  color: ${(props) => props.color || 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: ${(props) => (props.shadow === 'sm' ? props.theme.shadow_sm : props.shadow === 'md' ? props.theme.shadow_md : props.shadow === 'lg' ? props.theme.shadow_lg : '')};
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
