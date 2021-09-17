import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { theme } from '../../theme';

const Icon = styled.div`
  color: white;
`;

function SocialLoginButton({ provider, icon, children, ...props }) {
  const providers = {
    github: {
      background: theme.grey_900,
    }, // theme 설정 후, 변경 예정
  };

  return (
    <>
      {provider ? (
        <Button background={providers[provider].background} px={8} py={2} width="20rem" {...props}>
          <Icon>
            <FontAwesomeIcon icon={faGithub} />
          </Icon>
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
