import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet='utf-8' />
          <link href='https://fonts.cdnfonts.com/css/clash-display' rel='stylesheet' />
          <link href='https://fonts.cdnfonts.com/css/satoshi' rel='stylesheet' />
          <link href='https://fonts.cdnfonts.com/css/inter' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
