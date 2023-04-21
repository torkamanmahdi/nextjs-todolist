import { Html, Head, Main, NextScript } from 'next/document'
import Header from './Header'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Header />
      </Head>
      {/* <Head /> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
