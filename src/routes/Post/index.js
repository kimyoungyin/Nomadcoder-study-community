import React from 'react'
import styled from 'styled-components'
import Input from '../../components/UI/Input'
import NOMAD_COURSES from '../Courses';

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

function Post() {
  
  return (
    <Container>
      <Title>글쓰기</Title>
      <EditorWrapper>   
        <Form>
          <PostInput placeholder="제목 쓰기" />
          <TitleNotice>Min. 10. Max. 80</TitleNotice>
          <CategorySelect>
          <option value="placeholder">카테고리 고르기</option>
            {NOMAD_COURSES.map((course) => {
              return(
              <option value={course.category} key={course.category}>{course.category}</option>
              )})}
          </CategorySelect>
        </Form> 
      </EditorWrapper>
    </Container>
  )
}

export default Post
