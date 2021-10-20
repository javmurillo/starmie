import { FC, ReactElement } from 'react'
import { GetStaticProps } from 'next'

import { dbConnect } from '../../util/dbConnect'
import { IPokemon } from '../interfaces/IPokemon'
import PokemonsService from '../services/pokemon'

const Home: FC = (): ReactElement | null => {
  return null
}

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect()

  const pokemons = await PokemonsService.getPokemons()

  return {
    props: { pokemons: JSON.parse(JSON.stringify(pokemons)) as IPokemon[] },
  }
}

export default Home
