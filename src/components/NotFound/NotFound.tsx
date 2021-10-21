import Image from 'next/image'

import styles from './NotFound.module.scss'

const Custom404 = () => (
  <div className={styles.notFound}>
    <h1>Pokemon not found</h1>
    <Image
      src="/img/notfound.png"
      height={512}
      width={512}
      quality={100}
      alt="Not found image"
    />
  </div>
)

export default Custom404
