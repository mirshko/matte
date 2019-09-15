const Edit = () => {
  return (
    <div className="content">
      <div>
        <div className="square">
          <div className="inner">
            <img src="https://placehold.it/1080x1920" alt="" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .content {
          display: grid;
          place-items: center;
          min-height: 100%;
        }

        .square {
          display: block;
          position: relative;
          background-color: white;
          width: 400px;
          padding-top: 100%;
        }

        .square .inner {
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
        }

        img {
          max-height: 100%;
          width: auto;
          display: block;
        }
      `}</style>
    </div>
  );
};
export default Edit;
