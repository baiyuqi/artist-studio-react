import React from 'react';
import '../index.css';
import { PoundOutlined, NotificationOutlined,FileOutlined, EditOutlined, FolderViewOutlined, BookOutlined, PropertySafetyOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import ArticleEditor from './personal-comp/ArticleEditor';
import ArticleList from './personal-comp/ArticleList';
import NftMintor from './personal-comp/NftMintor';
import MyNft from './personal-comp/MyNft';
import ArticleScratch from './personal-comp/ArticleScratch';
import Blog from './personal-comp/ArticleEditor1';
const { Header, Content, Sider } = Layout;

const items2: MenuProps['items'] = [
    {
        key: '0',
        icon: React.createElement(BookOutlined),
        label: "article",
        children: [
            {
                key: '1',
                icon: React.createElement(EditOutlined),
                label: "write",
            },
            {
                key: '2',
                icon: React.createElement(FolderViewOutlined),
                label: "browse",
            }
        ]


    },
    {
        key: '10',
        icon: React.createElement(PoundOutlined),
        label: "collectables",
        children: [
            {
                key: '11',
                icon: React.createElement(PropertySafetyOutlined),
                label: "mint",
            },
            {
                key: '12',
                icon: React.createElement(FolderViewOutlined),
                label: "browse",
            }
        ]


    },
]


export default function Personal() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (

        <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    
                >
                    <Menu.SubMenu title="文章">
                        <Menu.Item  icon={React.createElement(EditOutlined)}><Link to="article-write">写文章</Link></Menu.Item>
                        <Menu.Item  icon={React.createElement(FileOutlined)}><Link to="article-scratch">草稿</Link></Menu.Item>
                        <Menu.Item  icon={React.createElement(FolderViewOutlined)}><Link to="article-browse">浏览</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu  title="藏品" >
                        <Menu.Item  icon={React.createElement(PoundOutlined)}><Link to="collectible-mint">铸币</Link></Menu.Item>
                        <Menu.Item  icon={React.createElement(PropertySafetyOutlined)}><Link to="collectible-browse">浏览</Link></Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                   
                   <Routes>
                            <Route path="article-write" element={<ArticleEditor />} />
                            <Route path="article-scratch" element={<ArticleScratch />} />
                            <Route path="article-browse" element={<ArticleList />} />
                            <Route path="collectible-mint" element={<NftMintor />} />
                            <Route path="collectible-browse" element={<MyNft />} />
                        </Routes>

                </Content>
            </Layout>
        </Layout>

    )
}