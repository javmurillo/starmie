import { LeanDocument } from 'mongoose'
import { INameUrl, PokeApi } from '../interfaces/IPokeApi'
import Pokemon, { PokemonDoc } from '../models/Pokemon'
import Type, { TypeDoc } from '../models/Type'

const getTypes = (): Promise<TypeDoc[]> => {
  return Type.find({})
    .populate([
      'dobleDamageFrom',
      'dobleDamageTo',
      'halfDamageFrom',
      'halfDamageTo',
      'noDamageFrom',
      'noDamageTo',
    ])
    .exec()
}

const findBaseStat = (
  array: PokeApi['pokemon']['stats'],
  stat: string
): number | undefined => {
  return array.find((object) => object.stat.name === stat)?.base_stat
}

const getTypeIds = async (arrayOfTypes: INameUrl[]): Promise<TypeDoc[]> => {
  return Promise.all(
    arrayOfTypes.map(async (type) => {
      return (await Type.findOne({ name: type.name }))?._id
    })
  )
}

const fetchAndPopulateTypes = async (): Promise<void> => {
  const typesUrl = 'https://pokeapi.co/api/v2/type/'
  const response: PokeApi['types'] = await (await fetch(typesUrl)).json()

  for (const type in response.results) {
    const newType = new Type({
      name: response.results[type].name,
    })
    await newType.save()
  }

  const types = await Type.find({})
  const promises = types.map(async (typeToUpdate) => {
    const fetchedType: PokeApi['type'] = await (
      await fetch('https://pokeapi.co/api/v2/type/' + typeToUpdate.name)
    ).json()

    typeToUpdate.dobleDamageFrom = await getTypeIds(
      fetchedType.damage_relations.double_damage_from
    )
    typeToUpdate.dobleDamageTo = await getTypeIds(
      fetchedType.damage_relations.double_damage_to
    )
    typeToUpdate.halfDamageFrom = await getTypeIds(
      fetchedType.damage_relations.half_damage_from
    )
    typeToUpdate.halfDamageTo = await getTypeIds(
      fetchedType.damage_relations.half_damage_to
    )
    typeToUpdate.noDamageFrom = await getTypeIds(
      fetchedType.damage_relations.no_damage_from
    )
    typeToUpdate.noDamageTo = await getTypeIds(
      fetchedType.damage_relations.no_damage_to
    )
    return typeToUpdate.save()
  })
  await Promise.all(promises)
}

const populatePokemonsDb = async (
  min: number,
  max: number
): Promise<Promise<PokemonDoc>[]> => {
  const url = 'https://pokeapi.co/api/v2/pokemon/'
  const savedPokemonPromises: Promise<PokemonDoc>[] = []

  for (let i = min; i <= max; i++) {
    const pokemon: PokeApi['pokemon'] = await (await fetch(url + i)).json()
    const newPokemon: PokemonDoc = new Pokemon({
      name: pokemon.name,
      number: pokemon.id,
      stats: {
        speed: {
          value: findBaseStat(pokemon.stats, 'speed'),
          rank: 0,
        },
        specialDefense: {
          value: findBaseStat(pokemon.stats, 'special-defense'),
          rank: 0,
        },
        specialAttack: {
          value: findBaseStat(pokemon.stats, 'special-attack'),
          rank: 0,
        },
        defense: {
          value: findBaseStat(pokemon.stats, 'defense'),
          rank: 0,
        },
        attack: {
          value: findBaseStat(pokemon.stats, 'attack'),
          rank: 0,
        },
        hp: {
          value: findBaseStat(pokemon.stats, 'hp'),
          rank: 0,
        },
      },
      types: await Promise.all(
        pokemon.types.map(async (typeObj) => ({
          slot: typeObj.slot,
          type: await Type.findOne({ name: typeObj.type.name }),
        }))
      ),
      passives: await Promise.all(
        pokemon.abilities.map(async (ability) => {
          const effect: PokeApi['effect'] = await (
            await fetch(ability.ability.url)
          ).json()
          const effectDescription = effect.effect_entries.find(
            (effectEntry) => effectEntry.language.name === 'en'
          )
          let short_effect = effectDescription
            ? effectDescription.short_effect
            : ''
          return {
            name: ability.ability.name,
            effect: short_effect,
            hidden: ability.is_hidden,
          }
        })
      ),
    })
    savedPokemonPromises.push(newPokemon.save())
    console.log('Saving...', newPokemon.name)
  }
  return savedPokemonPromises
}

const updatePokemonRanks = async (): Promise<void> => {
  const pokemonsBySpeed = await Pokemon.find().sort('stats.speed')
  const pokemonsBySpeedPromises = pokemonsBySpeed.map((pokemon, index) => {
    pokemon.stats.speed.rank = pokemonsBySpeed.length - index
    return pokemon.save()
  })
  console.log('Updating by Speed...')
  await Promise.all(pokemonsBySpeedPromises)

  const pokemonsBySpecialDefense = await Pokemon.find().sort(
    'stats.specialDefense'
  )
  const pokemonsBySpecialDefensePromises = pokemonsBySpecialDefense.map(
    (pokemon, index) => {
      pokemon.stats.specialDefense.rank =
        pokemonsBySpecialDefense.length - index
      return pokemon.save()
    }
  )
  console.log('Updating by Special Defense...')
  await Promise.all(pokemonsBySpecialDefensePromises)

  const pokemonsBySpecialAttack = await Pokemon.find().sort(
    'stats.specialAttack'
  )
  const pokemonsBySpecialAttackPromises = pokemonsBySpecialAttack.map(
    (pokemon, index) => {
      pokemon.stats.specialAttack.rank = pokemonsBySpecialAttack.length - index
      return pokemon.save()
    }
  )
  console.log('Updating by Special Attack...')
  await Promise.all(pokemonsBySpecialAttackPromises)

  const pokemonsByDefense = await Pokemon.find().sort('stats.defense')
  const pokemonsByDefensePromises = pokemonsByDefense.map((pokemon, index) => {
    pokemon.stats.defense.rank = pokemonsByDefense.length - index
    return pokemon.save()
  })
  console.log('Updating by Defense...')
  await Promise.all(pokemonsByDefensePromises)

  const pokemonsByAttack = await Pokemon.find().sort('stats.attack')
  const pokemonsByAttackPromises = pokemonsByAttack.map((pokemon, index) => {
    pokemon.stats.attack.rank = pokemonsByAttack.length - index
    return pokemon.save()
  })
  console.log('Updating by Attack...')
  await Promise.all(pokemonsByAttackPromises)

  const pokemonsByHp = await Pokemon.find().sort('stats.hp')
  const pokemonsByHpPromises = pokemonsByHp.map((pokemon, index) => {
    pokemon.stats.hp.rank = pokemonsByHp.length - index
    return pokemon.save()
  })
  console.log('Updating by HP...')
  await Promise.all(pokemonsByHpPromises)
  return
}

const getPokemons = (): Promise<LeanDocument<PokemonDoc>[]> =>
  Pokemon.find({}, 'name number')
    .populate({
      path: 'types.type',
      model: 'Type',
      select: { _id: 1, name: 1 },
    })
    .lean()
    .exec()

const getPokemon = (
  pokemonId: string | string[] | undefined
): Promise<LeanDocument<PokemonDoc> | null> =>
  Pokemon.findOne({ name: `${pokemonId}` })
    .populate({
      path: 'types.type',
      model: 'Type',
    })
    .lean()
    .exec()

const getStrongAgainst = async (pokemon: LeanDocument<PokemonDoc> | null) => {
  const strongAgainst = await Pokemon.find({
    $and: [
      {
        $or: [
          { 'types.type': { $in: pokemon?.types[0]?.type.dobleDamageTo } },
          { 'types.type': { $in: pokemon?.types[1]?.type.dobleDamageTo } },
        ],
      },
      {
        $or: [
          { 'stats.speed.rank': { $lt: 50 } },
          { 'stats.specialAttack.rank': { $lt: 50 } },
          { 'stats.attack.rank': { $lt: 50 } },
          { 'stats.attack.hp.rank': { $lt: 50 } },
          { 'stats.defense.rank': { $lt: 50 } },
          { 'stats.specialDefense.rank': { $lt: 50 } },
        ],
      },
    ],
  })
  return strongAgainst.sort(() => Math.random() - Math.random()).slice(0, 5)
}

const getWeakAgainst = async (pokemon: LeanDocument<PokemonDoc> | null) => {
  const typesQuery = [
    { 'types.type': { $in: pokemon?.types[0]?.type.halfDamageTo } },
  ]

  const weakAgainst = await Pokemon.find({
    $and: [
      {
        $and: typesQuery,
      },
      {
        $or: [
          { 'stats.speed.rank': { $lt: 50 } },
          { 'stats.specialAttack.rank': { $lt: 50 } },
          { 'stats.attack.rank': { $lt: 50 } },
          { 'stats.attack.hp.rank': { $lt: 50 } },
          { 'stats.defense.rank': { $lt: 50 } },
          { 'stats.specialDefense.rank': { $lt: 50 } },
        ],
      },
    ],
  })
  return weakAgainst.sort(() => Math.random() - Math.random()).slice(0, 5)
}

const getPokemonsNames = () => Pokemon.find({}, 'name').limit(1)

const PokemonsService = {
  getTypes,
  updatePokemonRanks,
  populatePokemonsDb,
  fetchAndPopulateTypes,
  getTypeIds,
  getPokemons,
  getPokemon,
  getStrongAgainst,
  getWeakAgainst,
  getPokemonsNames,
}

export default PokemonsService
