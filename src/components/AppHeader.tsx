import { useContext, useState, type FC } from "react";
import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import { CryptoContext } from "../context/crypto-context";
import { CoinInfoModal } from "./CoinInfoModal";

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 90,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#04437eff'
};




export const AppHeader:FC = () => {
    
    const [modal,setModal] = useState<boolean>(false)
    const [select,setSelect] = useState<any>(null)
    const [drawer,setDrawer] = useState<boolean>(false)

    const {crypto} = useContext(CryptoContext)
    
    const handleChange = (value: string) => {
      setSelect(crypto?.result.find(c=>c.id === value))
      setModal(true)
    }; 

    return (
        <Layout.Header style={headerStyle}>
            <Select
              style={{ width: '15%' }}
              defaultValue="choose / coin"
              onChange={handleChange}
              options={crypto?.result.map(c=>{
                return {
                  label:c.id,
                  value: c.id,
                  icon:c.icon,
                  price: c.price 
                }
              })}
              optionRender={(option) => (
                <Space>
                   <img style={{width:20}} src={option.data.icon} alt={option.data.label} />{option.data.label}
                </Space>
              )}
            />

            <Modal
              footer={null}
              title=''
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={modal}
              onCancel={()=>setModal(false)}
            >
            {select && (
              <CoinInfoModal select={select} />
            )}
            </Modal>
 
            <Button onClick={()=>setDrawer(true)}>Add Asset</Button>

            <Drawer
              width={550}
              title="Форма добавления монеты"
              closable={{ 'aria-label': 'Close Button' }}
              onClose={()=>setDrawer(false)}
              open={drawer}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Drawer>

        </Layout.Header>
    )
}