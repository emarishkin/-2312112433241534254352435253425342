import { useContext, type FC } from "react";
import {  Card, Layout, List, Statistic, Tag, Typography } from 'antd';
import {ArrowUpOutlined ,ArrowDownOutlined } from '@ant-design/icons';

import { CryptoContext } from "../context/crypto-context";

const siderStyle: React.CSSProperties = {
  padding:'1rem',
  backgroundColor:'#1d71c0ff'
};


export const AppSider:FC = () => {

   const {assets} = useContext(CryptoContext)


    return (
      <Layout.Sider width="20%" style={siderStyle}>
        {assets.map(asset=>(
          <Card key={asset.id} style={{ maxWidth: 500,width: "100%",  marginBottom: 16  }}>
            <Typography.Title style={{margin:0}}>{asset.id}</Typography.Title>
            <Statistic
              value={asset.totalProfit}
              precision={2}
              valueStyle={{ color: asset.grow ? '#3f8600' : '#f60320ff'}}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined /> }
              suffix="$"
            />
            <List
              bordered
              dataSource={[
                {title:'Общий профит: ',value:asset.totalProfit,withTag:true},
                {title:'Кол-во монет в портфеле: ',value:asset.amount,isPlain:true},
                {title:'Стоимость монет в портфеле: ',value:asset.totalAmount,isPlain:true}
              ]}
              renderItem={(item) => (
                <List.Item>
                    <span>{item.title}</span>
                    <span>
                        {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                    {item.isPlain && item.value.toFixed(1)}
                    {!item.isPlain && <Typography.Text type={asset.grow?'success':'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                    </span>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Layout.Sider>
    )
}