import React from 'react';
import '../index.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Home from './Home';

import { Routes, Route, Outlet, Link } from "react-router-dom";
import Connect from './Connect';

import styles from "./TopLayout.module.css"
import Personal from './Personal';
import NftMarket from './NftMarket';
import Test from './Test';

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
                <div className={styles.logo} />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
                    <Menu.Item>
                        <Link to="/">首页</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/nft-market">NFT市场</Link>
                    </Menu.Item>
                   
                    <Menu.Item>
                        <Link to="/personal">个人中心</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Test />
                    </Menu.Item>
                    <Menu.Item>
                        <Connect />
                    </Menu.Item>
                </Menu>
            </Header>
            <div>
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="/nft-market/*" element={<NftMarket />} />
                    <Route path="/personal/*" element={<Personal />} />
                </Routes>
            </div>
        </Layout>
    );
};
