import { Background } from "../lib/backgrounds";

const Brand = ({ color }: { color: Background }) => {
  const fill = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.alpha})`;

  return (
    <a
      href="https://reiner.design"
      rel="noopener"
      target="_blank"
      className="wrapper"
    >
      <svg width={45} height={45} viewBox="0 0 45 45" fill="none">
        <title>Matte.pics</title>
        <rect width={45} height={45} rx={11.25} fill={fill} />
        <path fill="var(--primary)" d="M10.195 10.195h24.609v24.609H10.195z" />
      </svg>
      <span className="version">2.0</span>
      <style jsx>{`
        rect {
          transition: fill 250ms ease-in;
        }
        .wrapper {
          display: flex;
          align-items: center;
          color: #fff;
          text-decoration: none;
        }
        .version {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-left: 0.75rem;
        }
      `}</style>
    </a>
  );
};

export default Brand;
