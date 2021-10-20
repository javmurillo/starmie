import { FC, ReactElement } from 'react'

import { IPokemonType } from '../../interfaces/IPokemon'
import getColor from '../../utils/getColor'

import styles from './TypeBadge.module.scss'

interface TypeBadgeProps {
  type: IPokemonType
}

const TypeBadge: FC<TypeBadgeProps> = ({ type }): ReactElement => (
  <span
    className={`${styles.badge}`}
    style={{ backgroundColor: getColor(type.type.name) }}
  >
    {type.type.name}
  </span>
)

export default TypeBadge
