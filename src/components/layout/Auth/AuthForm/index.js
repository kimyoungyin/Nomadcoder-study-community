import React from 'react'
import { useHistory } from 'react-router'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { authService } from '../../../../fb'
import useInput from '../../../../Hooks/useInput'
import authState from '../../../../recoil/authRecoil'
import Button from '../../../UI/Button'

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


function AuthForm({ authType }) {

  const setAuth = useSetRecoilState(authState);
  const history = useHistory();
  const email = useInput('');
  const password = useInput('');

  const submitHandler = async (e) =>{
    e.preventDefault();
    try{
      let auth;
      if(authType === 'login') {
          auth = await authService.signInUserWithEmailAndPassword(email.value, password.value);
      } else {
          auth = await authService.createUserWithEmailAndPassword(email.value, password.value);
      }

      if(auth.user){
        setAuth(auth.user);
        history.push('/');
      }
    } catch(error){
      console.log(error)
    }
  }


  return (
    <Form onSubmit={submitHandler}>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="text" {...email} />
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...password} />
              <Button py={3} type="submit">
                <span>Continue</span>
              </Button>
          </Form>
  )}

  


export default AuthForm
