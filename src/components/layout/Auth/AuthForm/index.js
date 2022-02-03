import React from "react";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { authService } from "../../../../fb";
import useInput from "../../../../Hooks/useInput";
import { authState } from "../../../../recoil/authRecoil";
import { theme } from "../../../../theme";
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0 1.25rem;
`;

const Label = styled.label`
    color: ${(props) => props.theme.grey_900};
    font-size: 0.875rem;
    font-weight: 500;
`;

function AuthForm({ authType }) {
    const setAuth = useSetRecoilState(authState);
    const history = useHistory();
    const email = useInput("");
    const password = useInput("");
    const displayName = useInput("");

    const checkDisplayNameValidation = () => {
        const typedDisplayName = displayName.value.trim();
        if (typedDisplayName.match(/@/) || typedDisplayName.match(/ /))
            return false;
        return true;
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (authType === "join" && !checkDisplayNameValidation()) {
            alert("닉네임을 수정해주세요.");
            return;
        }

        try {
            let auth;
            if (email.value.trim() === "") {
                alert("이메일을 입력해주세요");
                return;
            }
            if (password.value.trim() === "") {
                alert("비밀번호를 입력해주세요");
                return;
            }
            if (displayName.value.trim() === "" && authType === "join") {
                alert("닉네임을 입력해주세요");
                return;
            }
            if (authType === "login") {
                auth = await authService.signInWithEmailAndPassword(
                    email.value,
                    password.value
                );
            } else {
                auth = await authService.createUserWithEmailAndPassword(
                    email.value,
                    password.value
                );
            }

            if (auth.user) {
                console.log(auth.user.uid);
                await auth.user.updateProfile({
                    photoURL: theme.default_user_image,
                    displayName: displayName.value,
                });
                setAuth({
                    uid: auth.user.uid,
                    photoURL: theme.default_user_image,
                    displayName: displayName.value,
                });
                history.push("/");
            }
        } catch (error) {
            const authError = String(error);
            if (
                authError.includes(
                    "FirebaseError: Firebase: The password is invalid or the user does not have a password."
                )
            ) {
                alert(
                    "잘못된 비밀번호거나 해당 유저의 비밀번호가 존재하지 않습니다."
                );
            } else if (
                authError.includes(
                    "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted."
                )
            ) {
                alert("유저가 존재하지 않습니다.");
            } else if (
                authError.includes(
                    "FirebaseError: Firebase: The email address is badly formatted."
                )
            ) {
                alert("잘못된 이메일 형식입니다.");
            } else if (
                authError.includes(
                    "FirebaseError: Firebase: The password must be 6 characters long or more."
                )
            ) {
                alert("비밀번호는 최소 6자 이상이어야 합니다.");
            } else if (
                authError.includes(
                    "FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
                )
            ) {
                alert("해당 이메일의 계정이 이미 존재합니다.");
            }
        }
    };

    return (
        <Form onSubmit={submitHandler}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="text" {...email} required />
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...password} required />
            {authType === "join" && (
                <>
                    <Label htmlFor="displayName">Nickname</Label>
                    <Input
                        id="displayName"
                        type="displayName"
                        {...displayName}
                        required
                    />
                </>
            )}
            <Button py={3} type="submit">
                <span>Continue</span>
            </Button>
        </Form>
    );
}

export default AuthForm;
