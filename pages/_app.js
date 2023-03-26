import '@/styles/globals.css'
import Head from 'next/head'
import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { Context } from "/components/Context"

const url = "https://api.themoviedb.org/3/trending/movie/day?api_key=0c1f1398c2890733c2403de00114ffcd"

export default function App({ Component, pageProps }) {

  const [data, setData] = useState()


  useEffect(() => {
    async function getMovieData() {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      setData(data.results)
    }
    getMovieData()
  }, [url])


  return (
    <>
      <Head>
        <title>Movie Search App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Context.Provider value={data}>
        <Component {...pageProps} />
      </Context.Provider>
    </>
  )
}
