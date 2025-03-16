"use client"

import { decryptData } from '@/utils/crypto'
import { getSolanaKeyPair } from '@/utils/solana';
import React, { useState } from 'react'

export default function Login({onLogin}:any) {

    const [password,setPassword] = useState("");
    const handleLogin = async()=> {
        try {
            const storedData = JSON.parse(localStorage.getItem("WalletData") || "{}")
            const encryptedData = {
                salt : new Uint8Array(storedData.salt),
                iv: new Uint8Array(storedData.iv),
                encryptedContent: new Uint8Array(storedData.encryptedContent)
            }
            const mnemonics = await decryptData(password,encryptedData);
            const keyPair = await getSolanaKeyPair(mnemonics);
            onLogin(keyPair)      
        } catch (error) {
            console.log(error)
            alert("Invalid password")
        }
    }

    return (
        <div>
            <h1 className='text-center font-bold'>Login to Your Wallet</h1>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter the Password'/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
