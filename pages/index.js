import { Fragment, useRef, useState } from "react";
import { Button } from "../components/buttons";
import { FileInput } from "../components/inputs";
import Layout from "../components/layout";
import { CLOUDINARY_BASE } from "../lib/constants";
import { useDrop } from "react-use";

const Page = () => {
  const [file, setFile] = useState(undefined);
  const [imagePreview, setImagePreview] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const downloadRef = useRef(null);
  const state = useDrop({
    onFiles: (files) => {
      if (files[0].type.includes("image")) setFile(files[0]);
    },
  });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const saveImage = () => downloadRef.current.click();

  const clearFile = () => {
    setImagePreview(undefined);
    setFile(undefined);
  };

  const matFile = async () => {
    setLoading(true);

    try {
      const post = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { public_id } = await post.json();

      setImagePreview(CLOUDINARY_BASE + public_id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      window.alert(err.message);
    }
  };

  return (
    <Layout>
      <div className="top-left">
        <img
          className="icon"
          src="/favicon.png"
          alt="Matte.pics"
          title="Matte.pics"
        />
      </div>

      {Boolean(file) && (
        <Fragment>
          <div className="top-right">
            <Button onClick={clearFile}>New Matte</Button>
          </div>

          <div className="bottom-centered">
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

      <div>
        {/* Preview Mated Image */}
        {Boolean(imagePreview) && (
          <Fragment>
            <img className="img" src={imagePreview} alt="" />
            <a href={imagePreview} download hidden ref={downloadRef} />
          </Fragment>
        )}

        {/* Preview Uploaded Image */}
        {Boolean(file) && !Boolean(imagePreview) && (
          <img className="img" src={URL.createObjectURL(file)} alt="" />
        )}

        {/* Upload File */}
        {!Boolean(file) && <FileInput onChange={handleFileChange} />}
      </div>

      <style jsx global>{`
        body {
          transition: background-color 200ms;
          background-color: ${state?.over ? "#4E2452" : "#301934"};
        }
      `}</style>

      <style jsx global>{`
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
        }

        :focus {
          outline-offset: 1px;
          outline: 3px solid #c1e0fe;
          outline: 3px solid rgba(131, 192, 253, 0.5);
        }

        .img {
          width: auto;
          height: 100vmin;
          max-width: 100vmin;
          object-fit: contain;
          vertical-align: middle;
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
      `}</style>
    </Layout>
  );
};

export default Page;
