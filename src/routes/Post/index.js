import React from 'react';
import { dbService } from '../../../fb';
import EditorForm from '../../components/Editor/EditorForm';

function Post() {
  const postHandler = async (thread) => {
    await dbService.collection('threads').add(thread);
  };

  return <EditorForm formTitle="글쓰기" role="post" onSubmit={postHandler} />;
}

export default Post;
