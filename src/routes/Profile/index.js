import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import HorizonLine from '../../components/HorizonLine';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import { storageService } from '../../fb';
import useInput from '../../Hooks/useInput';
import { authState } from '../../recoil/authRecoil';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  padding: 5rem 9rem;
  @media ${(props) => props.theme.tablet} {
    padding: 5rem 1.5rem;
  }
  @media ${(props) => props.theme.mobile} {
    padding: 5rem 1rem;
  }
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 2;
  color: ${(props) => props.theme.grey_900};
  font-size: 1.125rem;
  font-weight: 500;

  &.color-red {
    color: #ef4444;
  }
`;

const ChangeRow = styled.div`
  padding: 1.5rem;

  input[type='file'] {
    display: none;
  }
  input[type='file'] + label {
    cursor: pointer;
    display: inline-block;
    border: 1px solid ${(props) => props.theme.grey_400};
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1rem;
    color: ${(props) => props.theme.grey_900};

    &:hover {
      color: ${(props) => props.theme.grey_500};
    }
  }
`;

const Title = styled.p`
  color: ${(props) => props.theme.grey_900};
  font-weight: 500;
  font-size: 0.875rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: end;
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.theme.grey_50};
`;

const DeleteButtonRow = styled(ButtonRow)`
  justify-content: space-between;
  align-items: center;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileCard = styled(Card)`
  flex: 5;
  padding: 0;
`;

const CustomInput = styled(Input)`
  width: 100%;
  line-height: 1.25rem;
  margin-bottom: 0.5rem;
`;

const DeleteButton = styled(Button)`
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.25;
    &:hover{opacity: 0.25;};
  `}
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;

function Profile() {
  const nickname = useInput('');
  const [avatar, setAvatar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const user = useRecoilValue(authState);
  const history = useHistory();
  useEffect(() => {
    setAvatar(user.photoURL);
  }, [user.photoURL]);

  const nicknameChangeHandler = async () => {
    if (nickname.value.length < 2) {
      alert('닉네임은 2글자 이상 작성해주세요.');
      return;
    }
    await user.updateProfile({
      displayName: nickname.value,
    });
    alert('닉네임이 변경되었습니다.');
  };

  const uploadHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const avatarSaveHandler = async () => {
    if (!selectedFile) {
      alert('변경할 프로필 사진을 선택해주세요.');
      return;
    }
    const image = storageService.ref().child(`/avatars/${selectedFile.name}`);
    await image.put(selectedFile);
    const imageUrl = await image.getDownloadURL();
    await user.updateProfile({
      photoURL: imageUrl,
    });
    setAvatar(imageUrl);
    alert('프로필 사진이 변경되었습니다.');
  };

  const deleteClickHandler = async () => {
    if (window.confirm('정말로 계정을 삭제하시겠습니까?')) {
      await user.delete();
      alert('계정이 삭제되었습니다.');
      history.push('/');
    }
  };

  const checkboxHandler = (e) => {
    setDisabled(!e.target.checked);
  };

  return (
    <Container>
      <Box>
        <Left>Nickname</Left>
        <ProfileCard>
          <ChangeRow>
            <Title>Nickname</Title>
            <CustomInput {...nickname} />
          </ChangeRow>
          <ButtonRow>
            <Button py={2} px={4} fs="0.875rem" onClick={nicknameChangeHandler}>
              <span>Change Nickname</span>
            </Button>
          </ButtonRow>
        </ProfileCard>
      </Box>
      <HorizonLine />
      <Box>
        <Left>Profile</Left>
        <ProfileCard>
          <ChangeRow>
            <Title>Avatar</Title>
            <AvatarContainer>
              <Avatar>
                <img src={avatar} alt="profile" />
              </Avatar>
              <input type="file" id="file-uploader" onChange={uploadHandler} />
              <label for="file-uploader">Choose Photo</label>
            </AvatarContainer>
          </ChangeRow>
          <ButtonRow>
            <Button py={2} px={4} fs="0.875rem" onClick={avatarSaveHandler}>
              <span>Upload & Save</span>
            </Button>
          </ButtonRow>
        </ProfileCard>
      </Box>
      <HorizonLine />
      <Box>
        <Left className="color-red">Delete Account</Left>
        <ProfileCard>
          <ChangeRow>
            <p>This is a permanent action and it can't be undone. After you delete your account no one will be able to recover it.</p>
          </ChangeRow>
          <DeleteButtonRow>
            <div>
              <input type="checkbox" id="delete-checkbox" onChange={checkboxHandler} />
              <label for="delete-checkbox">I understand this action is permanent and no one will be able to undo it</label>
            </div>
            <DeleteButton py={2} px={4} fs="0.875rem" background="#EF4444" disabled={disabled} onClick={deleteClickHandler}>
              <span>Delete Account</span>
            </DeleteButton>
          </DeleteButtonRow>
        </ProfileCard>
      </Box>
    </Container>
  );
}

export default Profile;
