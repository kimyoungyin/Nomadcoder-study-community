import React, { useEffect } from 'react';
import { dbService } from '../../fb';
import EditorForm from '../../components/Editor/EditorForm';

function Post() {
  const postHandler = async (thread) => {
    await dbService.collection('threads').add(thread);
  };

  return <EditorForm isPost={true} onSubmit={postHandler} />;
}

export default Post;
