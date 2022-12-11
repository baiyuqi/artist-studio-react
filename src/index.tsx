import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes } from "react-router-dom";
import TopLayout from './components/TopLayout';
import { ReactNotifications } from 'react-notifications-component'
import { ConfigProvider,theme } from 'antd';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 
    <BrowserRouter>
    <ReactNotifications />
    <ConfigProvider
    theme={{
    //  algorithm: theme.compactAlgorithm ,
      
    }}
  >
      <TopLayout />
      </ConfigProvider>
    </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
