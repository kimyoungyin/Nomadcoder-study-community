import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import HorizonLine from "../../components/HorizonLine";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { storageService } from "../../fb";
import useInput from "../../Hooks/useInput";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 9rem;
    background-color: ${(props) => props.theme.grey_50};
    @media ${(props) => props.theme.tablet} {
        padding: 5rem 1.5rem;
    }
    @media ${(props) => props.theme.mobile} {
        padding: 5rem 1rem;
    }

    strong {
        font-weight: bold;
    }
`;

const ContainerLayout = styled.div`
    max-width: 1280px;
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

    input[type="file"] {
        display: none;
    }
    input[type="file"] + label {
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

    div {
        margin-left: 0.5rem;
        font-size: 0.875rem;
    }

    @media ${(props) => props.theme.mobile} {
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
    }
`;

const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
`;

const ProfileCard = styled(Card)`
    flex: 5;
    padding: 0;
    @media ${({ theme }) => theme.mobile} {
        margin-top: 1.25rem;
    }
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

function Profile({ user, onChangeUserPhotoUrl }) {
    const nickname = useInput(user.displayName);
    const [avatar, setAvatar] = useState(user.photoURL);
    const [selectedFile, setSelectedFile] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();

    const nicknameChangeHandler = async () => {
        const newNickname = nickname.value.trim();
        if (newNickname.length < 2) {
            alert("닉네임은 2글자 이상 작성해주세요.");
            return;
        }

        if (user.displayName !== newNickname) {
            await user.updateProfile({
                displayName: nickname.value,
            });
            alert("닉네임이 변경되었습니다.");
        } else {
            alert("이전과 다른 닉네임으로 설정해주세요.");
        }
    };

    const uploadHandler = (e) => {
        const file = e.target.files[0];
        setAvatar(URL.createObjectURL(file));
        setSelectedFile(file);
    };

    const avatarSaveHandler = async () => {
        if (!selectedFile) {
            alert("변경할 프로필 사진을 선택해주세요.");
            return;
        }
        const image = storageService
            .ref()
            .child(`/avatars/${selectedFile.name}`);
        await image.put(selectedFile);
        const imageUrl = await image.getDownloadURL();
        await user.updateProfile({
            photoURL: imageUrl,
        });
        setAvatar(imageUrl);
        onChangeUserPhotoUrl(imageUrl);
        alert("프로필 사진이 변경되었습니다.");
    };

    const deleteClickHandler = async () => {
        if (window.confirm("정말로 계정을 삭제하시겠습니까?")) {
            await user.delete();
            alert("계정이 삭제되었습니다.");
            history.push("/");
        }
    };

    const checkboxHandler = (e) => {
        setDisabled(!e.target.checked);
    };

    return (
        <Container>
            <ContainerLayout>
                <Box>
                    <Left>Nickname</Left>
                    <ProfileCard>
                        <ChangeRow>
                            <Title>Nickname</Title>
                            <CustomInput {...nickname} />
                        </ChangeRow>
                        <ButtonRow>
                            <Button
                                py={2}
                                px={4}
                                fs="0.875rem"
                                onClick={nicknameChangeHandler}
                            >
                                <span>Change nickname</span>
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
                                <input
                                    type="file"
                                    id="file-uploader"
                                    onChange={uploadHandler}
                                />
                                <label htmlFor="file-uploader">
                                    Choose Photo
                                </label>
                            </AvatarContainer>
                        </ChangeRow>
                        <ButtonRow>
                            <Button
                                py={2}
                                px={4}
                                fs="0.875rem"
                                onClick={avatarSaveHandler}
                            >
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
                            <p>
                                This is a permanent action and it can't be
                                undone. After you delete your account{" "}
                                <strong>no one</strong> will be able to recover
                                it.
                            </p>
                        </ChangeRow>
                        <DeleteButtonRow>
                            <div>
                                <input
                                    type="checkbox"
                                    id="delete-checkbox"
                                    onChange={checkboxHandler}
                                />
                                <label htmlFor="delete-checkbox">
                                    I understand this action is{" "}
                                    <strong>permanent</strong> and no one will
                                    be able to undo it
                                </label>
                            </div>
                            <DeleteButton
                                py={2}
                                px={4}
                                fs="0.875rem"
                                background="#EF4444"
                                disabled={disabled}
                                onClick={deleteClickHandler}
                            >
                                <span>Delete Account</span>
                            </DeleteButton>
                        </DeleteButtonRow>
                    </ProfileCard>
                </Box>
            </ContainerLayout>
        </Container>
    );
}

export default Profile;
