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
            if (displayName.value.trim() === "") {
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
                await auth.user.updateProfile({
                    photoURL: theme.default_user_image,
                    displayName: displayName.value,
                });
                setAuth(auth.user);
                history.push("/");
            }
        } catch (error) {
            console.log(error);
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
