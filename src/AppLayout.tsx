import { Layout, Spin } from "antd";
import { useContext, type FC } from "react";
import { AppSider } from "./components/AppSider";
import { AppHeader } from "./components/AppHeader";
import { AppContent } from "./components/AppContent";
import { CryptoContext } from "./context/crypto-context";
import {LoadingOutlined  } from '@ant-design/icons';

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
};

export const AppLayout:FC = () => {

    const {loading} = useContext(CryptoContext)
    
    if(loading){
      return <Spin indicator={<LoadingOutlined style={{ fontSize: 170 }} spin />}  fullscreen/>
    }

    return (
        <>
        <Layout style={layoutStyle}>
            <AppSider />
            <Layout>
                <AppHeader />
                <AppContent />
            </Layout>
        </Layout>
        </>
    )
}