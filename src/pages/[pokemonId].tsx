import { FC, ReactElement } from 'react'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'

import Pokemon from '../models/Pokemon'
import { dbConnect } from '../../util/dbConnect'
import { IPokemon } from '../interfaces/IPokemon'
import PokemonDetail from '../components/PokemonDetail/PokemonDetail'
import PokemonsService from '../services/pokemon'

interface PokemonDetailPageProps {
  pokemon: IPokemon
  pokemons: IPokemon[]
  strongAgainst: IPokemon[]
  weakAgainst: IPokemon[]
}

const PokemonDetailPage: FC<PokemonDetailPageProps> = ({
  pokemon,
  pokemons,
  strongAgainst,
  weakAgainst,
}): ReactElement => {
  return (
    <PokemonDetail
      pokemon={pokemon}
      strongAgainst={strongAgainst}
      weakAgainst={weakAgainst}
      totalPokemons={pokemons.length}
    />
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const pokemonId = context.params && context.params.pokemonId

  await dbConnect()

  const [pokemons, pokemon] = await Promise.all([
    PokemonsService.getPokemons(),
    PokemonsService.getPokemon(pokemonId),
  ])

  const strongAgainst = await PokemonsService.getStrongAgainst(pokemon)
  const weakAgainst = await PokemonsService.getWeakAgainst(pokemon)

  return {
    props: {
      pokemon: JSON.parse(JSON.stringify(pokemon)) as IPokemon,
      pokemons: JSON.parse(JSON.stringify(pokemons)) as IPokemon[],
      strongAgainst: JSON.parse(JSON.stringify(strongAgainst)) as IPokemon[],
      weakAgainst: JSON.parse(JSON.stringify(weakAgainst)) as IPokemon[],
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect()

  const pokemons = await PokemonsService.getPokemonsNames()
  const serializedPokemons = JSON.parse(JSON.stringify(pokemons)) as IPokemon[]

  const paths: GetStaticPathsResult['paths'] = serializedPokemons.map(
    (pokemon: IPokemon) => ({
      params: { pokemonId: pokemon.name },
    })
  )

  return {
    paths,
    fallback: false,
  }
}

export default PokemonDetailPage