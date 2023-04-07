'use client'
import { MoralisProvider } from 'react-moralis'

export default function MoralisClientProvider({ children }) {
  return <MoralisProvider initializeOnMount={false}>{children}</MoralisProvider>
}
