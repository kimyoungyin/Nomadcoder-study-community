import React from 'react'
import AuthTitle from './AuthTitle'
import styled from 'styled-components'
import Card from '../../UI/Card'
import SocialLoginButton from '../../UI/SocialLoginButton'
import HorizonLine from '../../HorizonLine'

import AuthForm from './AuthForm'
import { authService, Providers } from '../../../fb'
import { useHistory } from 'react-router'
import { useSetRecoilState } from 'recoil'
import authState from '../../../recoil/authRecoil'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7rem;
`

const Wrapper = styled.div`
    margin-top: 2rem;
    max-width: 28rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    justify-content: center;
    align-items: center;
`


function Auth({authType, title}) {
  const history = useHistory();
  const setAuth = useSetRecoilState(authState);

  const socialAuthHandler = async () =>{
    try{
      const auth = await authService.signInWithPopup(Providers.github);
      if(auth.user){
        setAuth(auth.user);
        history.push('/')
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <Container>
      <AuthTitle>
        {title}
      </AuthTitle>
      <Wrapper>
        <Card style={{width: "100%"}}>
          <AuthForm authType={authType} />
        </Card>
        <HorizonLine text="OR" />
        <SocialLoginButton py={3} provider="github" onClick={socialAuthHandler}>{authType === 'login' ? '깃허브로 로그인': '깃허브로 회원가입'}</SocialLoginButton>
      </Wrapper>
    </Container>
  )
}

export default Auth;
