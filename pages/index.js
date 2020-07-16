import { Fragment, useRef, useState } from "react";
import { useDrop } from "react-use";
import Button from "../components/Button";
import FileInput from "../components/FileInput";
import { GOALS, trackGoal } from "../lib/fathom";

const COLORS = {
  WHITE: "white",
  BLACK: "black",
};

const Page = () => {
  const [file, setFile] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(COLORS.WHITE);

  const download = useRef(null);

  const state = useDrop({
    onFiles: (files) => {
      clearFile();
      handleSetFile(files[0]);
    },
  });

  const handleSetFile = (file) => {
    if (!file.type.includes("image")) {
      window.alert("Not An Image\nThis file type is not allowed.");
      return;
    }

    if (file.size > 4.9e6) {
      window.alert("Picture Too Large\nThis image is greater than 5 MB.");
      return;
    }

    setFile(file);
  };

  const handleOnChange = (e) => handleSetFile(e.target.files[0]);

  const saveImage = () => download.current.click();

  const clearFile = () => {
    setImage(undefined);
    setFile(undefined);
  };

  const matFile = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/mat?color=" + color, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const blob = await res.blob();

      trackGoal(GOALS.PhotoMatted);

      setImage(blob);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      window.alert(err.message);
    }
  };

  return (
    <div>
      <div className="top-left z-max">
        <img
          className="icon"
          src="/favicon.png"
          alt="Matte.pics"
          title="Matte.pics"
        />
      </div>

      {Boolean(file) && (
        <Fragment>
          <div className="top-right z-max">
            <Button onClick={clearFile}>New</Button>
          </div>

          <div className="bottom-centered z-max">
            {!Boolean(image) ? (
              <Button onClick={matFile}>
                {loading ? "Matting..." : "Matte"}
              </Button>
            ) : (
              <Button onClick={saveImage}>Save</Button>
            )}
          </div>
        </Fragment>
      )}

      <div className="middle-centered">
        {Boolean(image) && (
          <Fragment>
            <img
              className="img"
              alt={file.name}
              src={URL.createObjectURL(image)}
            />
            <a
              hidden
              ref={download}
              download={file.name}
              href={URL.createObjectURL(image)}
            />
          </Fragment>
        )}

        {Boolean(file) && !Boolean(image) && (
          <img
            className="img"
            alt={file.name}
            src={URL.createObjectURL(file)}
          />
        )}

        {!Boolean(file) && <FileInput onChange={handleOnChange} />}
      </div>
    </div>
  );
};

export default Page;
