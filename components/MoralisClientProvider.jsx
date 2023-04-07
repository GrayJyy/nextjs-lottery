'use client'
import { MoralisProvider } from 'react-moralis'

export function MoralisClientProvider({ children }) {
  return <MoralisProvider initializeOnMount={false}>{children}</MoralisProvider>
}
