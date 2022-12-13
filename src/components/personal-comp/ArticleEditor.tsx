import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js'
import { storeArticle } from '../../service/arweave-service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Layout, theme, Button, Space, Input, Divider } from 'antd';
const { Header, Content, Footer } = Layout;
function ArticleEditorQuill() {
    const [value, setValue] = useState('');
   
    return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
export default function ArticleEditorDraft() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [title, setTitle] = useState('');
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const onEditorStateChange = (es: EditorState) => {
        setEditorState(es);
    };



    function uploadImageCallBack(file: any) {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }
    async function publishPost() {
        // turn the state to html
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))//self-contained markdown ...
        const tags = {"Content-Type":"text/html", "Domain-Type":"article", title: title}
        const url = await storeArticle(html, tags);
        alert(url)

        // post the data to you mongo storage.
    }
    return (
        <Layout>

            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer
                }}
            >
                <Input onChange={(e)=>setTitle(e.target.value)} placeholder='请输入标题' />
  
                <Editor
                placeholder='请输入内容'
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />
            </Content>
            <Footer>
                <Space wrap>
                    <Button type="primary" onClick={publishPost} >发表</Button>
                    <Button type="primary" >保存</Button>
                </Space>
            </Footer>
        </Layout>
    );
}