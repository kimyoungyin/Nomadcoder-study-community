import React, { useState } from 'react'
import styled from 'styled-components'
import Card from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import SocialLoginButton from '../../components/UI/SocialLoginButton'
import HorizonLine from '../../components/HorizonLine'
import useInput from '../../Hooks/useInput'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  color: ${props=>props.theme.grey_910};
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

const Form = styled.form`
    display: flex;
    flex-direction: column;

`

const Label = styled.label`
  color: ${props=>props.theme.grey_900};
  font-size: 0.875rem;
`

const Input = styled.input`
    padding:  0.5rem 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid rgba(209,213,219);
    margin-bottom: 1.5rem;
`


function Login() {
  const email = useInput('');
  const password = useInput('');

  return (
    <Container>
      <Title>
        Log in to Nomad Study Community
      </Title>
      <Wrapper>
        <Card style={{width: "100%"}}>
          <Form>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="text" {...email} />
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...password} />
              <Button py={3}>
                <span>Continue</span>
              </Button>
          </Form>
        </Card>

        <HorizonLine text="OR" />

        <SocialLoginButton py={3}provider="github">깃허브로 로그인</SocialLoginButton>
      </Wrapper>
    </Container>
  )
}

export default Login;
