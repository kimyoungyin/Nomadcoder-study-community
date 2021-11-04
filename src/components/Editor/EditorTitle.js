import React from 'react'
import styled from 'styled-components';
import Input from '../UI/Input'

const StyledInput = styled(Input)`
  width: -webkit-fill-available;
  border: 1px solid ${(props) => props.theme.grey_500};
  font-size: 1.125rem;
  box-shadow: ${(props) => props.theme.shadow_md};
  margin-bottom: 0;
`;

const TitleNotice = styled.p`
  font-weight: 500;
  font-size: 0.75rem;
  color: ${(props) => props.theme.grey_500};
`;


function TitleInput({title}) {
  return (
    <>
      <StyledInput placeholder="제목 쓰기" {...title} />
      <TitleNotice>Min. 10. Max. 80</TitleNotice>
    </>
  )
}

export default TitleInput
