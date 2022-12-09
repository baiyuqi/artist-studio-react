import React from 'react';
import '../index.css';

import { EditOutlined, PoundOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import ArticleBrowser from './ArticleBrowser';
import MarketBrowser from './MarketBrowser';
import StarBrowser from './StarBrowser';
const { Header, Content, Sider } = Layout;



export default function Home() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (

        <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
                <Menu
                    mode="inline"
                    theme='light'
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}

                >
                    <Menu.Item icon={React.createElement(EditOutlined)}><Link to="home/article">文章</Link></Menu.Item>
                    <Menu.Item icon={React.createElement(PoundOutlined)}><Link to="home/market">市场</Link></Menu.Item>
                    <Menu.Item icon={React.createElement(UserOutlined)}><Link to="home/star">明星</Link></Menu.Item>

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
                            <Route path="home/article" element={<ArticleBrowser />} />
                            <Route path="home/market" element={<MarketBrowser />} />
                            <Route path="home/star" element={<StarBrowser />} />

                        </Routes>

                   
                </Content>
            </Layout>


        </Layout>

    )
}