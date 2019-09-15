export const New = () => {
  return (
    <>
      <button></button>
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: black;
          height: 40px;
          width: 40px;
          text-align: center;
          font-weight: 600;
          border-radius: 99999px;
          background-color: white;
          border: none;
          appearance: none;
          background: white;
          // box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.1),
          //   0px 10px 10px rgba(0, 0, 0, 0.04);
          box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.1),
            0px 4px 6px rgba(0, 0, 0, 0.06);
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

export const Save = ({ children = "Save" }) => {
  return (
    <>
      <button>{children}</button>
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
          // box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.1),
          //   0px 10px 10px rgba(0, 0, 0, 0.04);
          box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.1),
            0px 4px 6px rgba(0, 0, 0, 0.06);
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
