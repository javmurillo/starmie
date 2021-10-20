import { ReactElement, useState, FC, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'

import { IPokemon } from '../../interfaces/IPokemon'

import TypeBadge from '../TypeBadge/TypeBadge'

import styles from './Input.module.scss'

interface InputProps {
  pokemons: IPokemon[]
}

/**
 * Renders the Input component
 */
const Input: FC<InputProps> = ({ pokemons }): ReactElement => {
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const router = useRouter()

  const onChangeInput = (
    e: SyntheticEvent & { target: { value: string } }
  ): void => {
    const query = e.target.value
    setQuery(query)
    if (query.length >= 2) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const navigateToPokemon = (pokemonName: string): void => {
    setQuery(pokemonName)
    setShow(false)
    router.push(`/${pokemonName}`)
  }

  const getHighlightedText = (text: string): ReactElement => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return (
      <>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === query.toLowerCase()
                ? { fontWeight: 'bold', color: '#0070f3' }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </>
    )
  }

  return (
    <div className={styles['input-container']}>
      <input
        className={styles.input}
        onChange={onChangeInput}
        type="text"
        placeholder="Starmie"
        value={query}
        spellCheck="false"
      />
      {show && (
        <div className={styles.modal}>
          {pokemons
            .filter((pokemon) => pokemon.name.includes(query.toLowerCase()))
            .map((pokemon) => (
              <div
                className={styles['pokemon-item']}
                key={pokemon.number}
                onClick={() => navigateToPokemon(pokemon.name)}
              >
                <span className={styles.name}>
                  <span className={styles.number}>#{pokemon.number}</span>
                  {getHighlightedText(pokemon.name)}
                </span>
                {pokemon.types.map((type) => (
                  <TypeBadge type={type} key={type.type._id} />
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Input
