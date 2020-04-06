import Div100vh from "react-div-100vh";
import Head from "next/head";

const Layout = ({ children }) => (
  <Div100vh as="main" style={{display: "grid", placeItems: "center", height: '100rvh' }}>
    <Head>
      <title>Matte</title>
      <meta
        name="description"
        content="Give your photos that gallery quality aesthetic"
      />
      <link rel="manifest" href="/static/manifest.json" />
      <meta name="theme-color" content="#301934" />
      <link rel="icon" href="/static/favicon.png" />
      <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/static/apple-touch-icon@152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon@180.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/static/apple-touch-icon@167.png"
      />
    </Head>
    <style jsx global>{`
      *,
      ::before,
      ::after {
        box-sizing: border-box;
      }

      html {
        line-sizing: normal;
      }

      body {
        margin: 0;
        font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue",
          "Helvetica", "Arial", sans-serif;
        font-size: 17px;
        line-height: 1.47059;
        letter-spacing: -0.022em;
        -webkit-font-smoothing: antialiased;
        background-color: #301934;
        color: white;
      }

      :focus {
        outline-offset: 1px;
        outline: 3px solid #c1e0fe;
        outline: 3px solid rgba(131, 192, 253, 0.5);
      }
    `}</style>
    {children}
  </Div100vh>
);

export default Layout;
