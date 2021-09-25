import React, { useState } from 'react'
import styled from 'styled-components'
import Editor from '../../components/Editor';
import Input from '../../components/UI/Input'
import useInput from '../../Hooks/useInput';
import Button from '../../components/UI/Button';
import { theme } from '../../theme';
import NOMAD_COURSES from '../Courses';
import { dbService } from '../../fb';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authRecoil';
import { useHistory } from 'react-router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7rem;
`

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  letter-spacing: -.025em;
  color: ${(props) => props.theme.grey_910};
`;

const EditorWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin-top: 5rem;
  padding: 0 1.5rem;

  @media ${props=>props.theme.mobile} {
    padding: 0 1rem;
  }
`

const Form = styled.form`
  max-width: 42rem;
  width: 100%;
  margin: 0 auto;
`

const PostInput = styled(Input)`
  width: -webkit-fill-available;
  border: 1px solid ${props=>props.theme.grey_500};
  font-size: 1.125rem;
  box-shadow: ${props=>props.theme.shadow_md};
  margin-bottom: 0;
  
`

const TitleNotice = styled.p`
  font-weight: 500;
  font-size: 0.75rem;
  color: ${props=>props.theme.grey_500};
`

const CategorySelect = styled.select`
  margin-top: 1.25rem;
  margin-bottom: 0;
  appearance: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  width: 100%;
  border: 1px solid ${props=>props.theme.grey_500};
  font-size: 1.125rem;
  box-shadow: ${props=>props.theme.shadow_md};
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right .5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
`

const PostButton = styled(Button)`
  width: 100%;
  margin-top: 2rem;
` 

function Post() {
  const user = useRecoilValue(authState);
  const title = useInput('', (title) => title.length <= 80 );
  const [category, setCategory] = useState('');
  const [threadContent, setThreadContent] = useState('');
  const history = useHistory();
  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);    
  }
  const contentChangeHandler = (data) => {
    setThreadContent(data);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if(title.value.length < 10){
      alert('제목은 10글자 이상 작성해주세요.');
      return;
    } else if(category === ''){
      alert('카테고리를 선택해주세요.');
      return;
    }
    
    try{
      await dbService.collection("threads").add({
        category: category,
        isPinned: false,
        uid: user.uid,
        likes: [],
        comments: [],
        title: title.value,
        content: threadContent,
        createdAt: Date.now(),
      });
      setCategory('');
      setThreadContent('');
      history.push('/');
  } catch(error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <Title>글쓰기</Title>
      <EditorWrapper>   
        <Form onSubmit={submitHandler}>
          <PostInput placeholder="제목 쓰기" {...title} />
          <TitleNotice>Min. 10. Max. 80</TitleNotice>
          <CategorySelect value={category} onChange={categoryChangeHandler} >
          <option value="placeholder">카테고리 고르기</option>
            {NOMAD_COURSES.map((course) => {
              return(
              <option value={course.category} key={course.category}>{course.category}</option>
              )})}
          </CategorySelect>

          <Editor onChange={contentChangeHandler} />
          <PostButton py={2} background={theme.blue_light}><span>등록</span></PostButton>
        </Form> 
      </EditorWrapper>
    </Container>
  )
}

export default Post