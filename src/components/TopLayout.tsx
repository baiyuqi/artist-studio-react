import React from 'react';
import '../index.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Home from './Home';
import NftSearch from "./NftSearch"
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Connect from './Connect';
import NftMintor from './NftMintor';

const { Header, Content, Sider } = Layout;
const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

type Props = {

    children: JSX.Element,
};

export default function TopLayout() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
                    <Menu.Item>
                        <Link to="/home">首页</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/nft-browser">NFT浏览</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/nft-mintor">铸币</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Connect />
                    </Menu.Item>
                </Menu>
            </Header>
            <div>
                <Routes>
                    <Route path="/home/*" element={<Home />} />
                    <Route path="/nft-browser" element={<NftSearch />} />
                    <Route path="/nft-mintor" element={<NftMintor />} />
                    
                </Routes>
            </div>
        </Layout>
    );
};
