import { AppProps } from "next/app";
import "../styles/app.css";

export default function MatteApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}
