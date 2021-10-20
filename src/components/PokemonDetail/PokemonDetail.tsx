import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
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
}): ReactElement => {
  const [weak, setWeak] = useState(weakAgainst)
  const [strong, setStrong] = useState(strongAgainst)

  const reload = (): void => {
    fetch(`/api/reload?name=${pokemon.name}`)
      .then((response) => response.json())
      .then((data) => {
        const { newStrongAgainst, newWeakAgainst } = data
        setWeak(newWeakAgainst)
        setStrong(newStrongAgainst)
      })
  }

  return (
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
      <div className={styles['against-container']}>
        <button type="button" onClick={reload} className={styles.reload}>
          Update againsts
        </button>
        <div className={styles.against}>
          <div className={styles.strongAgainst}>
            <p>Strong Against</p>
            {strong.map(({ _id, name, number }) => (
              <Link href={`/${name}`} key={_id} passHref>
                <a>
                  <Image
                    src={`/img/${number}.gif`}
                    height={64}
                    width={64}
                    quality={100}
                    alt={`Image of ${name}`}
                  />
                </a>
              </Link>
            ))}
          </div>
          <div>
            <p>Weak Against</p>
            {weak.map(({ _id, name, number }) => (
              <Link href={`/${name}`} key={_id} passHref>
                <a>
                  <Image
                    src={`/img/${number}.gif`}
                    height={64}
                    width={64}
                    quality={100}
                    alt={`Image of ${name}`}
                    key={_id}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <PokemonStats pokemon={pokemon} totalPokemons={totalPokemons} />
    </div>
  )
}

export default PokemonDetail
