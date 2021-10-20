import { FC, ReactElement, ReactNode } from 'react'
import { IPokemon } from '../../interfaces/IPokemon'

import Input from '../Input/Input'

import styles from './Layout.module.scss'

interface LayoutProps {
  pokemons: IPokemon[]
  children: ReactNode
}

/**
 * Renders the Layout
 */
const Layout: FC<LayoutProps> = ({ pokemons, children }): ReactElement => {
  return (
    <main className={styles.main}>
      <Input pokemons={pokemons} />
      {children}
    </main>
  )
}

export default Layout
