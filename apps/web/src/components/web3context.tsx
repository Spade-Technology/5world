import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import merge from 'lodash.merge'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
  [process.env.NODE_ENV === 'production' ? mainnet : sepolia],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'Fifth World',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

interface Props {
  children: React.ReactNode
}

const Web3Context = (props: Props) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={merge(darkTheme(), {
          colors: {
            accentColor: '#36DFAE',
          },
        })}
      >
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Web3Context
