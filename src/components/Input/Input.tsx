import { ReactElement, useState, FC, SyntheticEvent, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
    const { value } = e.target
    setQuery(value)
    setShow(value.length >= 2)
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

  useEffect(() => {
    const navigateToPokemon = (): void => {
      setShow(false)
    }
    const pokemonName = window.location.pathname.replace('/', '')
    setQuery(pokemonName)

    router.events.on('routeChangeStart', navigateToPokemon)

    return () => {
      router.events.off('routeChangeStart', navigateToPokemon)
    }
  }, [router])

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
            .map(({ name, number, types }) => (
              <Link href={name} key={number} prefetch={false} passHref>
                <div className={styles['pokemon-item']}>
                  <span className={styles.name}>
                    <span className={styles.number}>#{number}</span>
                    {getHighlightedText(name)}
                  </span>
                  {types.map((type) => (
                    <TypeBadge type={type} key={type.type._id} />
                  ))}
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}

export default Input
