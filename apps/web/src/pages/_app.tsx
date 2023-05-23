import '~/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import { type AppType } from 'next/app'
import { type Session } from 'next-auth'

import { RainbowKitSiweNextAuthProvider, GetSiweMessageOptions } from '@rainbow-me/rainbowkit-siwe-next-auth'
import { SessionProvider } from 'next-auth/react'
import { StyleProvider } from '@ant-design/cssinjs'

import { api } from '~/utils/api'

import Web3Context from '~/components/web3context'
import { ConfigProvider, theme } from 'antd'
import { RainbowKitAuthenticationProvider, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
// antd css

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to VDAO',
})

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.cdnfonts.com/css/clash-display"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/inter" rel="stylesheet" />
      </Head>

      <SessionProvider session={session}>
        <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
          <Web3Context>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#36DFAE',
                  fontFamily: 'Clash Display',
                },
              }}
            >
              <StyleProvider hashPriority='high'>
                <Component {...pageProps} />
              </StyleProvider>
            </ConfigProvider>
          </Web3Context>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
