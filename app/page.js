import styles from './page.module.css'
import { Header, LotteryEntrance } from '@/components'

export default function Home() {
  return (
    <main className={styles.main}>
      <p className='text-6xl mb-3'>lottery</p>
      <Header />
      <LotteryEntrance />
    </main>
  )
}
