import React from 'react';
import Button from './Button';
import styled from 'styled-components';

const Icon = styled.img``;

function SocialLoginButton({ provider, icon, children, ...props }) {
const providers = {
  github: {
    background: props.theme.grey_border}, // theme 설정 후, 변경 예정
    icon: '',
  },
};
  return (
    <>
      {provider ? (
        <Button
          background={providers[provider].background}
          px={8}
          py={2}
          width="20rem"
          {...props}
        >
          <Icon src={providers[provider].icon} />
          <span>{children} → </span>
        </Button>
      ) : (
        <Button {...props}>
          <Icon src={icon} />
          <span>{children} </span>
        </Button>
      )}
    </>
  );
}

export default SocialLoginButton;
