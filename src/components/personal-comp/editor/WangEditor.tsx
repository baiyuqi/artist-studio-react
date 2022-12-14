
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { storeArticle } from '../../../service/arweave-service';
import 'react-quill/dist/quill.snow.css';
import { Layout, theme, Button, Space, Input, Divider } from 'antd';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor as WangEdtor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
const { Header, Content, Footer } = Layout;

export default function MyWangEditor() {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法
    const [title, setTitle] = useState('');
    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>')
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello world</p>')
        }, 1500)
    }, [])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法
    // const toolbarConfig = { }                        // JS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    async function publishPost() {
        // turn the state to html
       
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

                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <WangEdtor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </Content>
            <Footer>
                <Space wrap>
                    <Button type="primary" onClick={publishPost} >发表</Button>
                    <Button type="primary" >保存</Button>
                </Space>
            </Footer>
        </Layout>
    )
}


