export interface PokeApi {
  pokemon: {
    id: number
    name: string
    stats: [
      {
        base_stat: number
        effort: number
        stat: INameUrl
      }
    ]
    types: [
      {
        slot: number
        type: INameUrl
      }
    ]
    abilities: [
      {
        ability: INameUrl
        is_hidden: boolean
        slot: number
      }
    ]
  }
  type: {
    damage_relations: {
      double_damage_from: INameUrl[]
      double_damage_to: INameUrl[]
      half_damage_from: INameUrl[]
      half_damage_to: INameUrl[]
      no_damage_from: INameUrl[]
      no_damage_to: INameUrl[]
    }
  }
  effect: {
    effect_entries: [
      {
        effect: string
        language: INameUrl
        short_effect: string
      }
    ]
  }
  types: {
    results: INameUrl[]
  }
}

export interface INameUrl {
  name: string
  url: string
}
