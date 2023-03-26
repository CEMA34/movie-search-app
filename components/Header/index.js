import styles from "./header.module.css"
import Link from "next/link"

export default function Header() {

  return (
    <div className={styles.main}>

      <Link href="/" className={styles.main__allMoviesBtn}>
        <p className={styles.main__allMoviesBtn__tag} >All Movies</p>
      </Link>

      <Link href="/watchlist" className={styles.main__watchListBtn}>
        <p className={styles.main__watchListBtn__tag}>Watchlist</p>
      </Link>

      <Link href="/history" className={styles.main__watchHistoryBtn}>
        <p className={styles.main__watchHistoryBtn__tag}>Watch History</p>
      </Link>

    </div>
  )
}