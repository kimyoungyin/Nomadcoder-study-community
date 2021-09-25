import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'; 
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import styled from 'styled-components';


const FormWrapper = styled.div`
  margin-top: 3rem;

  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
  min-height: 200px;
  box-shadow: ${props=>props.theme.shadow_lg};
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  }
`


function Editor() {

  const [threadContent, setThreadContent] = useState('');

  return (
    <>
      <FormWrapper>
        <CKEditor
          editor={ClassicEditor}
          onReady={(editor)=>{
            editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setThreadContent(data);
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
          config = {
            	{
              plugins: [ CKFinder, Essentials, Paragraph, Bold, Italic, Heading, UploadAdapter, Autoformat, 
              EasyImage, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, Link, List, Alignment ],
              toolbar: {
                items:
                [
                  'heading', '|', 'alignment', 'bold', 'italic', 'link', 'bulletedList', 
                  'numberedList', 'imageUpload', 'insertTable', 'mediaEmbed', 'undo', 'redo'
                ],

              },
              image: {
                toolbar: [
                    'imageStyle:full',
                    'imageStyle:side',
                    '|',
                    'imageTextAlternative'
                ]
              },
              heading: {
                  options: [
                      { model: 'heading1', view: 'h1', title: '헤더1', class: 'ck-heading_heading1' },
                      { model: 'heading2', view: 'h2', title: '헤더2', class: 'ck-heading_heading2' },
                      { model: 'heading3', view: 'h3', title: '헤더3', class: 'ck-heading_heading3' },
                      { model: 'paragraph', title: '본문', class: 'ck-heading_paragraph' },
                  ]
              },
              ckfinder: {
                uploadUrl: 'http://api.dev.mustrip.io/meetup/upload/files/'
              },
            }
          }
        />
      </FormWrapper>
    </>
  )
}

export default Editor
