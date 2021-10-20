import { FC, ReactElement } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import Layout from '../components/Layout/Layout'

import '../styles/globals.scss'

const MyApp: FC<AppProps> = ({ Component, pageProps }): ReactElement => {
  return (
    <Layout {...pageProps}>
      <Head>
        <title>Starmie.io</title>
        <meta
          name="description"
          content="Starmie, a Pokemon database web application"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/PressStart2P.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
