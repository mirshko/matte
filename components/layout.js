import Div100vh from "react-div-100vh";

const Layout = ({ children }) => (
  <Div100vh>
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
        background-color: whitesmoke;
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
