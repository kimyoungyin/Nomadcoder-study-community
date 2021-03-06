import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { theme } from '../../theme';


const SocialStylingButton = styled(Button)`
  svg {
    height: 1rem;
    margin-right: 0.5rem;
  
    path {
      color: ${props=>props.iconColor}
    }
  }
`


function SocialLoginButton({ provider, icon, children, ...props }) {
  const providers = {
    github: {
      background: theme.grey_900,
      icon: faGithub,
      color: "white",
    },
  };

  return (
        <SocialStylingButton background={providers[provider].background} px={8} py={2} width="20rem" iconColor={providers[provider].color} {...props}>
          <FontAwesomeIcon icon={providers[provider].icon}/>
          <span>{children} → </span>
        </SocialStylingButton>
  );
}

export default SocialLoginButton;
