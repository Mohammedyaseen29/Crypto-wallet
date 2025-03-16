"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface walletContextType{
    wallet:any,
    setWallet:Dispatch<SetStateAction<any>>
}

const WalletContext = createContext<walletContextType | null>(null);

export function WalletProvider({children}:{children:ReactNode}){
    const [wallet,setWallet] = useState<any>(null)
    
    return(
        <WalletContext.Provider value={{wallet,setWallet}}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWallet(){
    const context = useContext(WalletContext);
    return context;
}