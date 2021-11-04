import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Editor from '../../Editor';
import useInput from '../../../Hooks/useInput';
import Button from '../../UI/Button';
import EditorTitle from '../EditorTitle';
import { theme } from '../../../theme';
import { dbService } from '../../../fb';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../recoil/authRecoil';
import { useHistory } from 'react-router';
import NOMAD_COURSES from '../../../routes/Courses';
import EditorPinCheck from '../EditorPinCheck';

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

function EditorForm({ formTitle, hasCategory, role }) {
  const user = useRecoilValue(authState);
  const title = useInput('', (title) => title.length <= 80);
  const [category, setCategory] = useState('');
  const [threadContent, setThreadContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [checked, setChecked] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (user.uid === process.env.REACT_APP_ADMIN_FIRST || user.uid === process.env.REACT_APP_ADMIN_SECOND) setIsPinned(true);
  }, []);

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };
  const contentChangeHandler = (data) => {
    setThreadContent(data);
  };

  const checkHandler = (e) => {
    setChecked(e.target.checked);
  };

  const addThread = async () => {
    await dbService.collection('threads').add({
      owner: {
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      category: category,
      isPinned: checked,
      likes: [],
      likesNum: 0,
      comments: [],
      commentsNum: 0,
      title: title.value,
      content: threadContent,
      createdAt: Date.now(),
    });
    setCategory('');
    setThreadContent('');
  };

  const editThread = async () => {
    // 글 수정하는 fb 코드
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (title.value.length < 10) {
      alert('제목은 10글자 이상 작성해주세요.');
      return;
    } else if (category === 'placeholder') {
      alert('카테고리를 선택해주세요.');
      return;
    } else if (category.length === 0) {
      alert('카테고리를 선택해주세요.');
      return;
    } else if (threadContent.length === 0) {
      alert('글을 작성해주세요.');
      return;
    }

    try {
      if (role === 'post') addThread();
      else if (role === 'edit') editThread();

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title>{formTitle}</Title>
      <EditorWrapper>
        <Form onSubmit={submitHandler}>
          <EditorTitle title={title} />
          {hasCategory && (
            <CategorySelect value={category} onChange={categoryChangeHandler}>
              <option value="placeholder">카테고리 고르기</option>
              {NOMAD_COURSES.map((course) => {
                return (
                  <option value={course.category} key={course.category}>
                    {course.category}
                  </option>
                );
              })}
            </CategorySelect>
          )}
          <EditorPinCheck isPinned={isPinned} onChange={checkHandler} />
          <Editor onChange={contentChangeHandler} />
          <PostButton py={2} background={theme.blue_light}>
            <span>등록</span>
          </PostButton>
        </Form>
      </EditorWrapper>
    </Container>
  );
}

EditorForm.defaultProps = {
  formTitle: '글쓰기',
  hasCategory: true,
  role: 'post',
};

export default EditorForm;
