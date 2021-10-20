export interface IType {
  _id: string
  name: string
  dobleDamageFrom: IType[]
  dobleDamageTo: IType[]
  halfDamageFrom: IType[]
  halfDamageTo: IType[]
  noDamageFrom: IType[]
  noDamageTo: IType[]
}
