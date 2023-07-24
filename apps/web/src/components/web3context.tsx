import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import merge from 'lodash.merge'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { infuraProvider } from 'wagmi/providers/infura'

const { chains, publicClient } = configureChains(
  [process.env.NODE_ENV === 'production' ? mainnet : sepolia],
  [process.env.NEXT_PUBLIC_INFURA_ID ? infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }) : publicProvider()],
)

export const connectors = [
  new MetaMaskConnector({
    chains,
  }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'VDAO',
    },
  }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: 'bb01fb605515afd12793c6a4b7bcecda',
      showQrModal: true,
    },
  }),
]

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

interface Props {
  children: React.ReactNode
}

const Web3Context = (props: Props) => {
  return <WagmiConfig config={wagmiConfig}>{props.children}</WagmiConfig>
}

export default Web3Context
