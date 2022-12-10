import React from 'react';
import '../index.css';
import { PoundOutlined, NotificationOutlined, EditOutlined, FolderViewOutlined, BookOutlined, PropertySafetyOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import ArticleEditor from './personal-comp/ArticleEditor';
import ArticleList from './personal-comp/ArticleList';
import NftMintor from './personal-comp/NftMintor';
import MyNft from './personal-comp/MyNft';
import ArticleScratch from './personal-comp/ArticleScratch';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;
const { Header, Content, Sider } = Layout;


const onSearch = (value: string) => console.log(value);
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
export default function NftMarket() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (



            <Layout style={{ padding: '0 24px 24px' }}>
                <div style={{ margin: '16px 0' }}>
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                </div>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        height: 800,
                        background: colorBgContainer,
                    }}
                >


                </Content>
            </Layout>


    )
}