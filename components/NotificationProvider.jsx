'use client'
import { NotificationProvider } from 'web3uikit'

export default function NotificationClientProvider({ children }) {
  return <NotificationProvider>{children}</NotificationProvider>
}
