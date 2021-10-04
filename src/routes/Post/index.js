import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Editor from "../../components/Editor";
import Input from "../../components/UI/Input";
import useInput from "../../Hooks/useInput";
import Button from "../../components/UI/Button";
import { theme } from "../../theme";
import NOMAD_COURSES from "../Courses";
import { dbService } from "../../fb";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/authRecoil";
import { useHistory } from "react-router";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 7rem;
    padding: 0 1rem;
`;

const Title = styled.h2`
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
    letter-spacing: -0.025em;
    color: ${(props) => props.theme.grey_910};
`;

const EditorWrapper = styled.div`
    max-width: 1280px;
    width: 100%;
    margin-top: 5rem;
    padding: 0 1.5rem;

    @media ${(props) => props.theme.mobile} {
        padding: 0 1rem;
    }
`;

const Form = styled.form`
    max-width: 42rem;
    width: 100%;
    margin: 0 auto;
`;

const PostInput = styled(Input)`
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

const CategorySelect = styled.select`
    margin: 1.25rem 0;
    appearance: none;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    width: 100%;
    border: 1px solid ${(props) => props.theme.grey_500};
    font-size: 1.125rem;
    box-shadow: ${(props) => props.theme.shadow_md};
    background-color: white;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
`;

const PostButton = styled(Button)`
    width: 100%;
    margin-top: 2rem;
`;

const IsPinnedBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    input[id="isPinned"] {
        display: none;
    }

    input[id="isPinned"] + label {
        display: inline-block;
        width: 1.2rem;
        height: 1.2rem;
        border: 1px solid ${(props) => props.theme.grey_500};
        border-radius: 4px;
        cursor: pointer;
        padding: 0;
    }

    input[id="isPinned"]:checked + label {
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

function Post() {
    const user = useRecoilValue(authState);
    const title = useInput("", (title) => title.length <= 80);
    const [category, setCategory] = useState("");
    const [threadContent, setThreadContent] = useState("");
    const [isPinned, setIsPinned] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (
            user.displayName === "kimyoungyin" ||
            user.displayName === "Jiho Shin"
        )
            setIsPinned(true);
    }, []);

    const categoryChangeHandler = (e) => {
        setCategory(e.target.value);
    };
    const contentChangeHandler = (data) => {
        setThreadContent(data);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (title.value.length < 10) {
            alert("제목은 10글자 이상 작성해주세요.");
            return;
        } else if (category === "placeholder") {
            alert("카테고리를 선택해주세요.");
            return;
        } else if (category.length === 0) {
            alert("카테고리를 선택해주세요.");
            return;
        } else if (threadContent.length === 0) {
            alert("글을 작성해주세요.");
            return;
        }

        try {
            await dbService.collection("threads").add({
                owner: {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                category: category,
                isPinned,
                likes: [],
                likesNum: 0,
                comments: [],
                commentsNum: 0,
                title: title.value,
                content: threadContent,
                createdAt: Date.now(),
            });
            setCategory("");
            setThreadContent("");
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container>
            <Title>글쓰기</Title>
            <EditorWrapper>
                <Form onSubmit={submitHandler}>
                    <PostInput placeholder="제목 쓰기" {...title} />
                    <TitleNotice>Min. 10. Max. 80</TitleNotice>
                    <CategorySelect
                        value={category}
                        onChange={categoryChangeHandler}
                    >
                        <option value="placeholder">카테고리 고르기</option>
                        {NOMAD_COURSES.map((course) => {
                            return (
                                <option
                                    value={course.category}
                                    key={course.category}
                                >
                                    {course.category}
                                </option>
                            );
                        })}
                    </CategorySelect>
                    {isPinned && (
                        <IsPinnedBox>
                            <input type="checkbox" id="isPinned" />
                            <label for="isPinned">
                                <div></div>
                            </label>
                            <span>핀 고정시키기</span>
                        </IsPinnedBox>
                    )}
                    <Editor onChange={contentChangeHandler} />
                    <PostButton py={2} background={theme.blue_light}>
                        <span>등록</span>
                    </PostButton>
                </Form>
            </EditorWrapper>
        </Container>
    );
}

export default Post;
