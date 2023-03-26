import styles from "./movies.module.css"
import { Context } from "/components/Context"
import { useContext } from "react"
import { Icon } from '@iconify/react'
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const imagesApi = "https://image.tmdb.org/t/p/w500/"

export default function Movies() {

    const movieData = useContext(Context)

    const [results, setResults] = useState([]);
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        setResults(movieData);
    }, [movieData]);

    const search = (event) => {
        const value = event.target.value;
        let updatedList = [...movieData];
        updatedList = updatedList.filter((item) => {
            return item.title.toLowerCase().includes(value.toLowerCase());
        });
        setResults(updatedList);
    };


    const sortResults = () => {
        if (sortBy === "rating") {
            setResults([...results].sort((a, b) => b.vote_average - a.vote_average));
        } else if (sortBy === "date") {
            setResults([...results].sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
        }
    };

    useEffect(() => {
        sortResults();
    }, [sortBy]);


    const [iconSelected, setIconSelected] = useState({});

    useEffect(() => {
        const savedIcons = JSON.parse(localStorage.getItem("iconSelected")) || {};
        const initialIcons = {};
        results &&
            results.forEach((movie) => {
                initialIcons[movie.id] = savedIcons[movie.id] || {
                    icon1: false,
                    icon2: false,
                };
            });
        setIconSelected(initialIcons);
    }, [results]);


    const iconToggle = (movieId, iconId) => {
        setIconSelected((prevState) => {
            const movieIcons = prevState[movieId];
            const newIcons = {
                ...prevState,
                [movieId]: { ...movieIcons, [iconId]: !movieIcons[iconId] },
            };
            localStorage.setItem("iconSelected", JSON.stringify(newIcons));
            return newIcons;
        });
    };


    function addToFavorites(movie) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const movieIndex = favorites.findIndex((f) => f.id === movie.id);
        if (movieIndex === -1) {
            favorites.push(movie);
        } else {
            favorites.splice(movieIndex, 1);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    function addToHistory(movie) {
        const history = JSON.parse(localStorage.getItem("history")) || [];
        const movieIndex = history.findIndex((f) => f.id === movie.id);
        if (movieIndex === -1) {
            history.push(movie);
        } else {
            history.splice(movieIndex, 1);
        }
        localStorage.setItem("history", JSON.stringify(history));
    }


    return (
        <>
            <div className={styles.inputContainer}>
                <motion.input whileHover={{ scale: 1.2, borderRadius: "20px" }} whileTap={{ scale: 1, borderRadius: "10px" }}
                    onChange={search} type="text" placeholder="Search Movies" className={styles.inputContainer__searchInput} />

                <motion.select whileHover={{ scale: 1.2, borderRadius: "20px" }} whileTap={{ scale: 1, borderRadius: "10px" }}
                    onChange={(event) => setSortBy(event.target.value)} className={styles.inputContainer__select}>
                    <option value="">Sort by</option>
                    <option value="rating">IMDb Rating</option>
                    <option value="date">Release Date</option>
                </motion.select>
            </div>

            <div className={styles.container}>
                {results && results.map((movie, index) => {
                    return (
                        <motion.div initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, scale: [1.3, 1] }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            key={index}
                            className={styles.main}>
                            <div className={styles.main__inner}>
                                <div className={styles.inner__icon}>
                                    <motion.div whileHover={{ scale: 1.5 }} whileTap={{ scale: 1 }}>
                                        <Icon
                                            onClick={() => {
                                                iconToggle(movie.id, "icon1")
                                                addToFavorites(movie)
                                            }}
                                            icon={iconSelected[movie.id]?.icon1 ? "carbon:star-filled" : "carbon:star"}
                                            className={styles.inner__icon__star} />
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.5 }} whileTap={{ scale: 1 }}>
                                        <Icon onClick={() => {
                                            iconToggle(movie.id, "icon2")
                                            addToHistory(movie)
                                        }}
                                            icon={iconSelected[movie.id]?.icon2 ? "healthicons:yes" : "healthicons:yes-outline"}
                                            className={styles.inner__icon__outline} />
                                    </motion.div>
                                </div>
                                <p className={styles.main__movieTitle}>{movie.title}</p>
                            </div>
                            <img src={imagesApi + movie.poster_path} className={styles.main__moviePoster}></img>
                            <p className={styles.main__movieDescription}>{movie.overview}</p>
                        </motion.div>
                    )
                })}
            </div>
        </>
    )

}