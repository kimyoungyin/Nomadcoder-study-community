import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import UploadAdapter from '../ckfinder/UploadAdapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
import ImageResizeHandles from '@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import styled from 'styled-components';

const FormWrapper = styled.div`
  margin-top: 3rem;

  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 200px;
    box-shadow: ${(props) => props.theme.shadow_lg};
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }

  * {
    color: black;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.17rem;
  }

  strong {
    font-weight: bold;
  }

  i {
    font-style: italic;
  }

  a {
    color: ${(props) => props.theme.blue_light};
    text-decoration: revert;
  }

  ul,
  ol {
    list-style: inside;
    padding-left: 1rem;
  }
  img {
    max-width: 100%;
  }
`;

function Editor({ onChange }) {
  return (
    <>
      <FormWrapper>
        <CKEditor
          editor={ClassicEditor}
          onReady={(editor) => {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
              return new UploadAdapter(loader);
            };
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          config={{
            plugins: [Essentials, Paragraph, Bold, Italic, Heading, UploadAdapter, Autoformat, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, ImageResizeEditing, ImageResizeHandles, Link, List, Alignment],
            toolbar: {
              items: ['heading', '|', 'alignment', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'imageUpload', 'insertTable', 'mediaEmbed', 'undo', 'redo'],
            },
            image: {
              toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative'],
            },
            heading: {
              options: [
                { model: 'heading1', view: 'h1', title: '헤더1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: '헤더2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: '헤더3', class: 'ck-heading_heading3' },
                { model: 'paragraph', title: '본문', class: 'ck-heading_paragraph' },
              ],
            },
          }}
        />
      </FormWrapper>
    </>
  );
}

export default Editor;
