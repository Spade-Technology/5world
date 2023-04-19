import { Html, Main, NextScript } from "next/document";
import Head from "next/head";
import React from "react";

export const _document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="application-name" content="Fifth World" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <link
          href="https://fonts.cdnfonts.com/css/clash-display"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/inter" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
