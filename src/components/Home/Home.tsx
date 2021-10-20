import { FC, ReactElement } from 'react'
import Image from 'next/image'

import styles from './Home.module.scss'

const Home: FC = (): ReactElement => (
  <div className={styles['image-container']}>
    <Image
      src="/img/logo.png"
      className={styles.image}
      quality={100}
      alt="Pokemon image"
      width="640"
      height="256"
    />
  </div>
)

export default Home
