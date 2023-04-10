'use client'
import { useEffect, useState } from 'react'
import { useWeb3Contract } from 'react-moralis'
import { useMoralis } from 'react-moralis'
import { abi, contractAddresses } from '@/constants'
import { useNotification } from 'web3uikit'
import { Button, Bell, Information, Typography } from 'web3uikit'
import { ethers } from 'ethers'

export default function LotteryEntrance() {
  const dispatch = useNotification()
  const [entranceFee, setEntranceFee] = useState('0')
  const [memberInfo, setMemberInfo] = useState({
    number: 0,
    recentWinner: '0x0000000000000000000000000000000000000000',
  })
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
  useEffect(() => {
    if (contractAddress && window.ethereum) {
      console.log('go')
      // console.log(web3.currentProvider)
      // console.log(window.ethereum)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // const provider = new ethers.providers.Web3Provider(web3.currentProvider)
      // console.log(provider)
      const contract = new ethers.Contract(contractAddress, abi, provider)
      contract.on('RequestRaffleWinner', requestId => {
        console.log(requestId)
      })
      contract.on('WinnerPicked', recentWinner => {
        console.log(recentWinner)
        setMemberInfo({ number: 0, recentWinner })
      })
    }
  }, [contractAddress])
  const { runContractFunction: enterRaffle, isLoading } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: 'enterRaffle',
    msgValue: entranceFee,
  })
  const handleSuccess = async tx => {
    await tx.wait(1)
    fetchData()
    handleNewNotification('success')
  }
  const handleNewNotification = type => {
    dispatch({
      type,
      title: 'Transaction Notification',
      message: 'Transaction Success!',
      position: 'topR',
      icon: <Bell fontSize={20} />,
    })
  }
  const handleEnter = async () => {
    await enterRaffle({
      onSuccess: handleSuccess,
      onError: err => {
        console.error(err)
      },
    })
  }
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: 'getEntranceFee',
  })

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: 'getNumberOfPlayers',
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: 'getRecentWinner',
  })
  const fetchData = async () => {
    if (isWeb3Enabled) {
      const res = (await getEntranceFee()).toString()
      const res2 = (await getNumberOfPlayers()).toString()
      const res3 = await getRecentWinner()
      console.log(res3)
      setEntranceFee(res)
      setMemberInfo({ ...memberInfo, number: res2, recentWinner: res3 })
    }
  }
  useEffect(() => {
    if (parseInt(chainIdHex) in contractAddresses) {
      fetchData()
    } else {
      setEntranceFee('0')
    }
  }, [isWeb3Enabled, chainIdHex])

  return (
    <>
      <Typography variant='H1'>Here is my lottery~</Typography>
      {!contractAddress ? (
        <Information
          topic='Warning'
          information='Raffle is not exist at this address!!!'
          style={{ width: 200, marginTop: 40, textAlign: 'center' }}
        />
      ) : entranceFee === '0' ? (
        <Information topic='Fetching entranceFee...' style={{ width: 200, marginTop: 40, textAlign: 'center' }} />
      ) : (
        <div>
          <Button
            onClick={handleEnter}
            text={isLoading ? 'waiting for transaction...' : 'Enter Raffle'}
            theme='secondary'
            disabled={isLoading}
            style={{ margin: '0 auto' }}
          />
          <Information
            information={`${ethers.utils.formatUnits(entranceFee, 'ether')} ETH`}
            topic='EntranceFee'
            style={{ width: 200, margin: '20px auto', marginTop: 40, textAlign: 'center' }}
          />
          <Information
            information={memberInfo.number}
            topic='Number Of Players'
            style={{ width: 200, margin: '20px auto', textAlign: 'center' }}
          />
          <Information
            information={
              memberInfo.recentWinner === '0x0000000000000000000000000000000000000000'
                ? 'Picking......'
                : memberInfo.recentWinner
            }
            topic='Recent Winner'
            style={{ width: 800, marginTop: 40, textAlign: 'center' }}
          />
        </div>
      )}
    </>
  )
}
