export const Button = (props) => {
  return (
    <>
      <button {...props} />
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: black;
          font-size: 17px;
          padding: 10px 22px;
          text-align: center;
          font-weight: 600;
          border-radius: 99999px;
          background-color: white;
          border: none;
          appearance: none;
          background: white;
        }

        button:focus {
          outline: none;
        }

        button::before,
        button::after {
          content: "";
          display: block;
          position: absolute;
          border-radius: inherit;
        }

        button::before {
          z-index: 0;
          width: 100%;
          height: 100%;
        }

        button:focus::before {
          box-shadow: 0 0 0 3px rgba(131, 192, 253, 0.5);
          outline: none;
        }
      `}</style>
    </>
  );
};
