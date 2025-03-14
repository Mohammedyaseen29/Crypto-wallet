"use client"

import { mnemonicGenerate } from "@polkadot/util-crypto";
import { useState } from "react";

interface verificationWordsTypes{
    index:number;
    words:string;
}


export default function CreateWalletPage({onCreate}:any){
    const [password,setPassword] = useState("");
    const [mnemonics,setMnemonics] = useState("");
    const [verificationWords,setVerificationWords] = useState<verificationWordsTypes[]>([]);
    const [userInput,setUserInput] = useState(["","",""])

    const generateMnemonic = ()=>{
        const mnemonicPhrase = mnemonicGenerate(12);
        setMnemonics(mnemonicPhrase);
        const words = mnemonicPhrase.split(" ");
        const indices = [2,5,8];
        //@ts-ignore
        setVerificationWords(indices.map((i)=>({index:i,word:words[i]})))
    }
    const verifyMnemonics = ()=>{
        const words = mnemonics.split(" ");
        const isValid = verificationWords.every(({index},i)=>userInput[i] === words[index]);
        if(isValid){
            onCreate(password,mnemonics)
        }
        else{
            alert("Verification Failed!")
        }
    }

    return(
        <div>
            <h1>Create New Wallet</h1>
            <input type="password" placeholder="Set password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={generateMnemonic}>Generate Seed Phrase</button>
            {mnemonics && (
                <div>
                    <p>Write down these 12 words securely:</p>
                    <p>{mnemonics}</p>
                    <p>verify by entering Words {" "}
                    {verificationWords.map((w:any)=>w.index + 1).join(",")}
                    </p>
                    {verificationWords.map((_,i)=>(
                        <input
                            key={i}
                            type="text"
                            value={userInput[i]}
                            onChange={(e)=>{
                                const newInput = [...userInput];
                                newInput[i] = e.target.value;
                                setUserInput(newInput)
                            }}
                            placeholder={`word ${verificationWords[i].index + 1}`}
                        />
                    ))}
                    <button onClick={verifyMnemonics}>verify and Create</button>
                </div>
            )}
        </div>
    )

}