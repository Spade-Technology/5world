import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import merge from "lodash.merge";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [process.env.NODE_ENV === "production" ? mainnet : sepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Fifth World",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

interface Props {
  children: React.ReactNode;
}

const Web3Context = (props: Props) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={merge(darkTheme(), {
          colors: {
            accentColor: "#36DFAE",
          },
        })}
      >
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Context;
