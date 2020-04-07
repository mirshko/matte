import { trackGoal } from "fathom-client";
import { Fragment, useRef, useState } from "react";
import { useDrop } from "react-use";
import Button from "../components/Button";
import FileInput from "../components/FileInput";

const BACKGROUND_TYPES = {
  WHITE: "white",
  BLACK: "black",
};

const Page = () => {
  const [file, setFile] = useState(undefined);
  
  const [imagePreview, setImagePreview] = useState(undefined);

  const [loading, setLoading] = useState(false);

  const [background, setBackground] = useState(BACKGROUND_TYPES.WHITE);

  const download = useRef(null);

  const state = useDrop({
    onFiles: (files) => {
      clearFile();
      handleSetFile(files[0]);
    },
  });

  const handleSetFile = (file) => {
    if (!file.type.includes("image")) {
      window.alert("Not An Image\nThis image type is not allowed.");
      return;
    }

    if (file.size > 1e7) {
      window.alert("Picture Too Large\nThis image is greater than 10 MB.");
      return;
    }

    setFile(file);
  };

  const handleOnChange = (e) => handleSetFile(e.target.files[0]);

  const saveImage = () => download.current.click();

  const clearFile = () => {
    setImagePreview(undefined);
    setFile(undefined);
  };

  const matFile = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/upload?background=" + background, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const blob = await res.blob();

      trackGoal("Y1VU2I3B", 0);
      setImagePreview(URL.createObjectURL(blob));
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
            {!Boolean(imagePreview) ? (
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
        {/* Preview Mated Image */}
        {Boolean(imagePreview) && (
          <Fragment>
            <img className="img" src={imagePreview} alt={file.name} />
            <a ref={download} href={imagePreview} hidden download={file.name} />
          </Fragment>
        )}

        {/* Preview Uploaded Image */}
        {Boolean(file) && !Boolean(imagePreview) && (
          <img
            className="img"
            src={URL.createObjectURL(file)}
            alt={file.name}
          />
        )}

        {/* Upload File */}
        {!Boolean(file) && <FileInput onChange={handleOnChange} />}
      </div>

      <style jsx global>{`
        :root {
          --primary: #301934;
          --primary-light: #4e2452;
        }

        html {
          box-sizing: border-box;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        body {
          margin: 0;
          font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue",
            "Helvetica", "Arial", sans-serif;
          font-size: 17px;
          line-height: 1.47059;
          letter-spacing: -0.022em;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: white;
          background-color: var(--primary);
        }

        .img {
          width: 320px;
          height: 320px;
          object-fit: contain;
          vertical-align: middle;
        }

        @media (min-width: 52em) {
          .img {
            width: 640px;
            height: 640px;
          }
        }

        .icon {
          height: 45px;
          width: 45px;
          vertical-align: middle;
        }

        .top-left {
          position: fixed;
          top: 24px;
          left: 24px;
        }

        .top-right {
          position: fixed;
          top: 24px;
          right: 24px;
        }

        .bottom-centered {
          position: fixed;
          bottom: 32px;
          transform: translateX(-50%);
          left: 50%;
        }

        .middle-centered {
          position: fixed;
          top: 50%;
          transform: translate3d(-50%, -50%, 0);
          left: 50%;
        }

        .z-max {
          z-index: 99999;
        }
      `}</style>
    </div>
  );
};

export default Page;
