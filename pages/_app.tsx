import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/app.css";

export default function MatteApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Head>
        <title>Matte.pics</title>
      </Head>

      <Component {...pageProps} />
    </main>
  );
}
