import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button';
import logo from '../../../logo.svg';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authState, isLoggedInState } from '../../../recoil/authRecoil';
import { authService } from '../../../fb';

const Container = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const PaddingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  max-width: 80rem;
  padding: 0 1.5rem;
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const Logo = styled.img`
  width: 2.5rem;
`;

const LogoWrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Avatar = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  img {
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
  }
`

const AvatarModal = styled.div`
  position: absolute;
  top: 2rem;
  right: 0;
  background-color: white;
  width: 12rem;
  box-shadow: ${props=>props.theme.shadow_lg};
  border-radius: 0.375rem;
`

const AvatarModalBlock = styled.a`
  display: block;
  width: 100%;
  padding: .5rem 1rem;
  line-height: 1.25rem;
  color: ${props=>props.theme.grey_900};
  font-size: .875rem;
  background-color: white;
  
  &:hover {
    background: ${props=>props.theme.grey_100};
  }
`

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const setAuth = useSetRecoilState(authState);
  const [showModal, setShowModal] = useState(false);

  const toggleModalHandler = () => {
    setShowModal(prev=> !prev);
  }

  const LogoutHandler =  async () => {
    try{
      await authService.signOut();
      setIsLoggedIn(false);
      setAuth(null);
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <PaddingWrapper>
        <LogoWrapper>
          <Link to="/">
          <Logo src={logo} alt="" />
          </Link>
        </LogoWrapper>
        <ButtonWrapper>
          {!isLoggedIn ? (
            <>
              <Button px={8} py={2} background="transparent">
                <Link to="/login">Login</Link>
              </Button>
              <Button px={8} py={2} color="white">
                <Link to="/join">
                  <span>Join</span>
                </Link>
              </Button>
            </>
          ) : (
            <Avatar onClick={toggleModalHandler}>
              <img src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/zih0-1612321695.jpg" alt="test-avatar" />
              {showModal && (
                <AvatarModal>
                <AvatarModalBlock href="#">Edit Profile</AvatarModalBlock>
                <AvatarModalBlock href="#" onClick={LogoutHandler}>Logout</AvatarModalBlock>
              </AvatarModal>
              )}
            </Avatar>
          )}
          {/* 추후 유저 프로필 DB 생성 시 img 동적으로 수정 */}
        </ButtonWrapper>
      </PaddingWrapper>
    </Container>
  );
}

export default Header;
