import React, { useState, useEffect } from "react"
import PokemonList from "./PokemonList"
import Pagination from "./Pagination"

function App() {
  const [pokemons, setPokemons] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  )
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    setLoading(true)

    fetch(currentPageUrl, signal)
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        setPokemons(data.results.map(p => p.name))
        setNextPageUrl(data.next)
        setPrevPageUrl(data.previous)
      })
      .catch(err => console.log(err))

    controller.abort()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  return (
    <>
      <PokemonList pokemons={pokemons} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  )
}

export default App
