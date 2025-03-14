import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";

export async function getSolanaKeyPair(mnemonic:string,index = 0){
    const seed = await mnemonicToSeed(mnemonic);
    const path =  `m/44'/501'/${index}/0`;
    const derivedSeed = derivePath(path,seed.toString('hex')).key;
    return Keypair.fromSeed(derivedSeed);
}   