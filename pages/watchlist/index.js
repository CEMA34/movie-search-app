import styles from "./watchList.module.css";
import Header from "/components/Header";
import { motion } from "framer-motion"

const imagesApi = "https://image.tmdb.org/t/p/w500/"

export default function WatchList() {

  const favorites = JSON.parse(localStorage.getItem("favorites"))

  return (
    <>
      <Header />
      <div className={styles.container}>
        {favorites && favorites.map((movie,index) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, scale: [1.3, 1] }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              key={index}
              className={styles.main}>
              <p className={styles.main__movieTitle}>{movie.title}</p>
              <img className={styles.main__moviePoster} src={imagesApi + movie.poster_path} />
              <p className={styles.main__movieDescription}>{movie.overview}</p>
            </motion.div>
          )
        })}
      </div>
    </>
  );
}