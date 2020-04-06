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
          line-height: inherit;
          font-size: 17px;
          padding: 10px 22px;
          text-align: center;
          font-weight: 600;
          border-radius: 99999px;
          background-color: white;
          border: none;
          appearance: none;
        }

        button:focus,
        button:active {
          outline: none;
          box-shadow: 0 0 0 3px rgba(131, 192, 253, 0.5);
        }
      `}</style>
    </>
  );
};
