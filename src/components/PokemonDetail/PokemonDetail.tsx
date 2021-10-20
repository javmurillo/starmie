import Image from 'next/image'
import Link from 'next/link'
import { FC, ReactElement } from 'react'
import { IPokemon } from '../../interfaces/IPokemon'
import PokemonPassive from '../PokemonPassive/PokemonPassive'
import TypeBadge from '../TypeBadge/TypeBadge'
import styles from './PokemonDetail.module.scss'
import PokemonStats from './PokemonStats/PokemonStats'

interface PokemonDetailProps {
  pokemon: IPokemon
  strongAgainst: IPokemon[]
  weakAgainst: IPokemon[]
  totalPokemons: number
}

/**
 * Renders the Pokemon Detail component
 */
const PokemonDetail: FC<PokemonDetailProps> = ({
  pokemon,
  strongAgainst,
  weakAgainst,
  totalPokemons,
}): ReactElement => (
  <div className={styles.container}>
    <div className={styles['first-row']}>
      <div className={styles['image-container']}>
        <div>
          <Image
            src={`/img/${pokemon.number}.gif`}
            height={160}
            width={160}
            quality={100}
            alt={`Image of ${pokemon.name}`}
          />
        </div>
        <div className={styles.types}>
          {pokemon.types.map((type) => (
            <TypeBadge type={type} key={type.type._id} />
          ))}
        </div>
      </div>
      <div className={styles.passives}>
        {pokemon.passives.map((passive) => (
          <PokemonPassive passive={passive} key={passive.name} />
        ))}
      </div>
    </div>
    <div className={styles.against}>
      <div className={styles.strongAgainst}>
        <p>Strong Against</p>
        {strongAgainst.map((pokemon) => (
          <Link href={`/${pokemon.name}`} key={pokemon._id} passHref={true}>
            <Image
              src={`/img/${pokemon.number}.gif`}
              height={64}
              width={64}
              quality={100}
              alt={`Image of ${pokemon.name}`}
            />
          </Link>
        ))}
      </div>
      <div>
        <p>Weak Against</p>
        {weakAgainst.map((pokemon) => (
          <Image
            src={`/img/${pokemon.number}.gif`}
            height={64}
            width={64}
            quality={100}
            alt={`Image of ${pokemon.name}`}
            key={pokemon._id}
          />
        ))}
      </div>
    </div>

    <PokemonStats pokemon={pokemon} totalPokemons={totalPokemons} />
  </div>
)

export default PokemonDetail
