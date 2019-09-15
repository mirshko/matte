const Upload = () => {
  return (
    <div className="content">
      <div>
        <input type="file" name="image" accept="image/*" />
      </div>
      <style jsx>{`
        .content {
          display: grid;
          place-items: center;
          min-height: 100%;
        }
      `}</style>
    </div>
  );
};
export default Upload;
