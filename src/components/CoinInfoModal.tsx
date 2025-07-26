import { Image, Space, Typography } from "antd";
import type { FC } from "react";

interface CoinInfoModalProps{
 select:any
}

 export const CoinInfoModal:FC<CoinInfoModalProps> = ({select}) => {
    return (
       <>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Image 
                src={select.icon} 
                alt={select.id} 
                width={50}
                preview={false}
              />
              <Typography style={{ fontSize: '1.5rem' }}>
                {select.id}
              </Typography>
            </Space>
            
            <Typography>Цена: <Typography>{select.price.toFixed(2)}$</Typography></Typography>
            
            {select.marketCap && (
              <Typography>Капитализация: <Typography>${(select.marketCap / 1000000000).toFixed(2)} млрд</Typography></Typography>
            )}
        </Space>
       </>
    )
 }