import Head from "next/head";

const Layout = ({ children }) => (
  <main>
    <Head>
      <title>Matte.pics</title>
      <meta
        name="description"
        content="Give your photos that gallery quality aesthetic"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#301934" />
      <link rel="icon" href="/favicon.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-touch-icon@152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon@180.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/apple-touch-icon@167.png"
      />
      <link rel="preload" href="/favicon.png" as="image" />
    </Head>
    {children}
  </main>
);

export default Layout;
