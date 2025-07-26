import type { FC } from "react";
import {  Layout } from 'antd';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#04437eff'
};


export const AppHeader:FC = () => {
    return (
        <Layout.Header style={headerStyle}>Header</Layout.Header>
    )
}