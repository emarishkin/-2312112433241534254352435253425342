import { createContext, useEffect, useState, type ReactNode } from "react";
import type { CryptoAsset, CryptoData } from "../types/type";
import { fetchApiAssets, fetchApiCrypto } from "../Api";
import { percentDifference } from "../utils";

interface CryptoContextType {
  assets: DopArr[];
  crypto: CryptoData | null;
  loading: boolean;
}

export const CryptoContext = createContext<CryptoContextType>({
    assets:[],
    crypto:null,
    loading:false
})

interface CryptoContextProviderProps {
  children: ReactNode
}

interface DopArr extends CryptoAsset {
  grow:boolean,
  growPercent:number,
  totalAmount: number;
  totalProfit: number;
}

export function CryptoContextProvider({children}:CryptoContextProviderProps){

    const [crypto,setCrypto] = useState<CryptoData | null>(null)
        const [assets,setAssets] = useState<DopArr[]>([])
        const [loading,setLoading] = useState<boolean>(false)
        
        useEffect(()=>{
          async function preload() {
             setLoading(true)
             const cryptoArr = await fetchApiCrypto() as CryptoData
             const assetsArr = await fetchApiAssets() as CryptoAsset[]
    
             setCrypto(cryptoArr)
             setAssets(assetsArr.map(asset=>{
              const coin = cryptoArr?.result.find(c=>c.id === asset.id)
    
              if(!coin){
                return {
                  ...asset,
                  grow:false,
                  growPercent: 0,
                  totalAmount: 0,
                  totalProfit: 0
                }
              }
    
              return {
                ...asset,
                grow: asset.price < coin?.price,
                growPercent:percentDifference(asset.price,coin.price),
                totalAmount:asset.amount * coin.price,
                totalProfit:asset.amount * coin.price - asset.amount * asset.price
              }
             }))
             setLoading(false)
          }
          preload()
        },[])


    return (
    <CryptoContext.Provider value={{loading,assets,crypto}}>
     {children}
    </CryptoContext.Provider>
    )
}