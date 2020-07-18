import Head from "next/head";
import Support from "../components/Support";
import useFathom from "../hooks/useFathom";
import "../styles/app.css";

export default function MatteApp({ Component, pageProps }) {
  useFathom();

  return (
    <main>
      <Head>
        <title>Matte.pics</title>
      </Head>

      <Component {...pageProps} />

      <div className="bottom-left">
        <Support />
      </div>
    </main>
  );
}
