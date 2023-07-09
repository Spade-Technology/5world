import '~/styles/globals.css'

import { type AppType } from 'next/app'
import { type Session } from 'next-auth'

import { SessionProvider } from 'next-auth/react'
import { StyleProvider } from '@ant-design/cssinjs'

import { api } from '~/utils/api'

import Web3Context from '~/components/web3context'
import { ConfigProvider } from 'antd'

import Head from 'next/head'

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
      </Head>

      <SessionProvider session={session} refetchInterval={0}>
        <Web3Context>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#36DFAE',
                fontFamily: 'Clash Display',
              },
              components: {
                Spin: {
                  colorPrimary: 'white',
                },
              },
            }}
          >
            <StyleProvider hashPriority='high'>
              <Component {...pageProps} />
            </StyleProvider>
          </ConfigProvider>
        </Web3Context>
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
