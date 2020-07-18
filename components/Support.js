import Buoy from "../svgs/Buoy";

const Support = () => (
  <a
    className="support-link"
    title="Email Support"
    href="mailto:support@matte.pics?subject=Support"
  >
    <Buoy />
    <style jsx>{`
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        color: black;
        width: 36px;
        height: 36px;
        text-decoration: none;
        border-radius: 99999px;
        background-color: white;
      }

      a:focus,
      a:active {
        outline: none;
        box-shadow: 0 0 0 3px rgba(131, 192, 253, 0.5);
      }
    `}</style>
  </a>
);

export default Support;
