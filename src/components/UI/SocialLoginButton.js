import React from 'react';
import Button from './Button';
import styled from 'styled-components';

const Icon = styled.img``;

const providers = {
  github: {
    background: '#374151', // theme 설정 후, 변경 예정
    icon: '',
  },
};

function SocialLoginButton({ provider, icon, children, ...props }) {
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
