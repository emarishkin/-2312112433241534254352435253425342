import { cryptoAssets, cryptoData } from "./data/data"

export const fetchApiCrypto = () => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve(cryptoData)
        },1000)
    })
}

export const fetchApiAssets = () => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve(cryptoAssets)
        },1000)
    })
}