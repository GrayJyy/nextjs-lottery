import styles from './page.module.css'
import { Header, LotteryEntrance } from '@/components'

export default function Home() {
  return (
    <main className={styles.main}>
      <h3>lottery</h3>
      <Header />
      <LotteryEntrance />
    </main>
  )
}
