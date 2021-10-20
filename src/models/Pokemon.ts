import mongoose from 'mongoose'
import { IPokemon } from '../interfaces/IPokemon'
import Type, { TypeDoc } from './Type'

const StatSchema = {
  value: Number,
  rank: Number,
}

const PokemonSchema = new mongoose.Schema({
  name: String,
  number: Number,
  stats: {
    speed: StatSchema,
    specialDefense: StatSchema,
    specialAttack: StatSchema,
    defense: StatSchema,
    attack: StatSchema,
    hp: StatSchema,
  },
  types: [
    {
      _id: false,
      slot: Number,
      type: { type: mongoose.Schema.Types.ObjectId, ref: Type },
    },
  ],
  passives: [
    {
      _id: false,
      name: String,
      effect: String,
      hidden: Boolean,
    },
  ],
})

export type PokemonDoc = Omit<IPokemon, 'types'> & ITypesDoc & mongoose.Document

interface ITypesDoc {
  types: [
    {
      slot: number
      type: TypeDoc
    }
  ]
}

const PokemonModel =
  (mongoose.models.Pokemon as mongoose.Model<PokemonDoc>) ||
  mongoose.model<PokemonDoc>('Pokemon', PokemonSchema)

export default PokemonModel
