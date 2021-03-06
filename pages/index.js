import { Fragment, useRef, useState } from "react";
import { useDrop, useStateList } from "react-use";
import Brand from "../components/Brand";
import Button from "../components/Button";
import FileInput from "../components/FileInput";
import BACKGROUNDS from "../lib/backgrounds";
import { GOALS, trackGoal } from "../lib/fathom";

const Page = () => {
  const [file, setFile] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { state: color, next, setStateAt } = useStateList(
    Object.keys(BACKGROUNDS)
  );
  const cycleColor = () => next();

  const download = useRef(null);
  const saveImage = () => download.current.click();

  useDrop({
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

    /**
     * Seems its not truely 5 MB, perhaps due to the encoding of the image being sent to the server being larger than the actual image in the finder.
     */
    if (file.size > 4.8e6) {
      window.alert("Picture Too Large\nThis image is greater than 5 MB.");
      return;
    }

    setFile(file);
  };

  const handleOnChange = (e) => handleSetFile(e.target.files[0]);

  const clearFile = () => {
    setImage(undefined);
    setFile(undefined);
    setStateAt(0);
  };

  const matFile = async () => {
    setImage(undefined);

    setLoading(true);

    try {
      const res = await fetch("/api/mat?color=" + color, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (res.status === 413)
        throw new Error(
          "Picture Too Large\nThis image is greater than the 5 MB limit."
        );

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
    <Fragment>
      <div className="top-left z-max">
        <Brand color={BACKGROUNDS[color]} />
      </div>

      {!!file && (
        <div className="top-right z-max">
          <Button onClick={clearFile}>New</Button>
        </div>
      )}

      <div className="middle-centered">
        {!!image && (
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

        {!!file && !image && (
          <img
            className="img"
            alt={file.name}
            src={URL.createObjectURL(file)}
          />
        )}

        {!file && <FileInput onChange={handleOnChange} />}
      </div>

      <div className="bottom-centered z-max">
        {!!file && !!image && <Button onClick={saveImage}>Save</Button>}
      </div>

      <div className="bottom-right z-max button-stack">
        {!!file && <Button onClick={cycleColor}>{color}</Button>}

        {!!file && (
          <Button onClick={matFile}>{loading ? "Matting..." : "Matte"}</Button>
        )}
      </div>
    </Fragment>
  );
};

export default Page;
