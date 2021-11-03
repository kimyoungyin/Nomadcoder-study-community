import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { authState } from '../recoil/authRecoil';


const IsPinnedBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  input[id='isPinned'] {
    display: none;
  }

  input[id='isPinned'] + label {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid ${(props) => props.theme.grey_500};
    border-radius: 4px;
    cursor: pointer;
    padding: 0;
  }

  input[id='isPinned']:checked + label {
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      display: block;
      width: 100%;
      height: 100%;
      border: 2px solid white;
      background-color: ${(props) => props.theme.blue_light};
      border-radius: 3px;
    }
  }
`;

function PinCheckBox({isPinned, onChange}) {  
  return (
    <>
    {isPinned && (
      <IsPinnedBox>
        <input type="checkbox" id="isPinned" onChange={onChange} />
        <label for="isPinned">
          <div></div>
        </label>
        <span>핀 고정시키기</span>
      </IsPinnedBox>
    )}
    </>
  )
}

export default PinCheckBox
