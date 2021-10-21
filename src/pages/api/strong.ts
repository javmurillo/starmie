import { NextApiRequest, NextApiResponse } from 'next'
import PokemonsService from '../../services/pokemon'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query
  const pokemon = await PokemonsService.getPokemon(name)

  const [newStrongAgainst, newWeakAgainst] = await Promise.all([
    PokemonsService.getStrongAgainst(pokemon),
    PokemonsService.getWeakAgainst(pokemon),
  ])

  res.status(200).json({
    newStrongAgainst,
    newWeakAgainst,
  })
}
