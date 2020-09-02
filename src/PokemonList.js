import React from "react"

export default function PokemonList({ pokemons }) {
  return (
    <div>
      {pokemons.map(p => (
        <div key={p}>{p}</div>
      ))}
    </div>
  )
}
