import { EditorState, convertToRaw ,AtomicBlockUtils} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js'
import { storeArticle } from '../../../service/arweave-service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Layout, theme, Button, Space, Input, Divider } from 'antd';

import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor as WangEdtor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

const { Header, Content, Footer } = Layout;
export default function ArticleEditorQuill() {
    const [value, setValue] = useState('');
   
    return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}