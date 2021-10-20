import { IType } from './IType'

export interface IPokemon {
  _id: string
  name: string
  number: number
  stats: {
    speed: IStat
    specialDefense: IStat
    specialAttack: IStat
    defense: IStat
    attack: IStat
    hp: IStat
  }
  types: IPokemonType[]
  passives: IPokemonPassive[]
}

export interface IPokemonType {
  slot: number
  type: IType
}

export interface IPokemonPassive {
  name: string
  effect: string
  hidden: boolean
}

interface IStat {
  value: number
  rank: number
}
