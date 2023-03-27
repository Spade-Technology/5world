import "~/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { StyleProvider } from "@ant-design/cssinjs";

import { api } from "~/utils/api";

import Web3Context from "~/components/web3context";
import { ConfigProvider, theme } from "antd";
// antd css

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Web3Context>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#36DFAE",
              fontFamily: "Clash Display",
            },
          }}
        >
          <StyleProvider hashPriority="high">
            <Component {...pageProps} />
          </StyleProvider>
        </ConfigProvider>
      </Web3Context>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
