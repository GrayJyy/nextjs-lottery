import './globals.css'
import { MoralisClientProvider, NotificationClientProvider } from '../components'

export const metadata = {
  title: 'My Lottery',
  description: 'just for learning',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <MoralisClientProvider>
          <NotificationClientProvider>{children}</NotificationClientProvider>
        </MoralisClientProvider>
      </body>
    </html>
  )
}
