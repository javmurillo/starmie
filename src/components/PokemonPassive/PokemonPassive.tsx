import { FC } from 'react'
import { IPokemonPassive } from '../../interfaces/IPokemon'

import styles from './PokemonPassive.module.scss'

interface PokemonPassiveProps {
  passive: IPokemonPassive
}

const PokemonPassive: FC<PokemonPassiveProps> = ({ passive }) => (
  <div className={styles.passive} key={passive.name}>
    <p className={styles.passiveTitle}>
      <strong>
        {passive.name}
        {passive.hidden ? ' (Hidden)' : ''}
      </strong>
    </p>
    <p className={styles.effect}>{passive.effect}</p>
  </div>
)

export default PokemonPassive
