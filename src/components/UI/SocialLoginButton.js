import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { theme } from '../../theme';


const SocialStylingButton = styled(Button)`
  svg {
    color: white;
    margin-right: 0.5rem;
  }
`


function SocialLoginButton({ provider, icon, children, ...props }) {
  const providers = {
    github: {
      background: theme.grey_900,
    },
  };

  return (
    <>
      {provider ? (
        <SocialStylingButton background={providers[provider].background} px={8} py={2} width="20rem" {...props}>
          <FontAwesomeIcon icon={faGithub} />
          <span>{children} → </span>
        </SocialStylingButton>
      ) : (
        <SocialStylingButton {...props}>
          <img src={icon} />
          <span>{children} </span>
        </SocialStylingButton>
      )}
    </>
  );
}

export default SocialLoginButton;
