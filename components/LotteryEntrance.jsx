'use client'
import { useWeb3Contract } from 'react-moralis'
import { useMoralis } from 'react-moralis'
import { abi, contractAddresses } from '@/constants'

export default function LotteryEntrance() {
  const { chainId: chainIdHex } = useMoralis()
  console.log(chainIdHex)
  const chainId = parseInt(chainIdHex)
  // const { runContractFunction: enterRaffle } = useWeb3Contract({
  //   abi,
  //   contractAddress: contractAddresses[chainId][0],
  //   functionName: 'enterRaffle',
  // })

  return <div>Hi from lottery entrance!</div>
}
