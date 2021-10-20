import mongoose from 'mongoose'
import { IType } from '../interfaces/IType'

const TypeSchema = new mongoose.Schema({
  name: String,
  dobleDamageFrom: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
  dobleDamageTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
  halfDamageFrom: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
  halfDamageTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
  noDamageFrom: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
  noDamageTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
})

export type TypeDoc = Omit<
  IType,
  | 'dobleDamageFrom'
  | 'dobleDamageTo'
  | 'halfDamageFrom'
  | 'halfDamageTo'
  | 'noDamageFrom'
  | 'noDamageTo'
> &
  IDamageDocs &
  mongoose.Document

interface IDamageDocs {
  dobleDamageFrom: TypeDoc[]
  dobleDamageTo: TypeDoc[]
  halfDamageFrom: TypeDoc[]
  halfDamageTo: TypeDoc[]
  noDamageFrom: TypeDoc[]
  noDamageTo: TypeDoc[]
}

const TypeModel =
  (mongoose.models.Type as mongoose.Model<TypeDoc>) ||
  mongoose.model<TypeDoc>('Type', TypeSchema)

export default TypeModel
