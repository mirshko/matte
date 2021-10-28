const Brand = () => {
  return (
    <a
      href="https://reiner.design"
      rel="noopener"
      target="_blank"
      className="wrapper"
    >
      <svg width={45} height={45} viewBox="0 0 45 45" fill="none">
        <title>Matte.pics</title>
        <rect width={45} height={45} rx={11.25} fill={"#fff"} />
        <path fill="var(--primary)" d="M10.195 10.195h24.609v24.609H10.195z" />
      </svg>

      <style jsx>{`
        .wrapper {
          display: block;
          height: 45px;
          width: 45px;
        }
      `}</style>
    </a>
  );
};

export default Brand;
