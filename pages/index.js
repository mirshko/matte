import { Fragment, useRef, useState } from "react";
import { Button } from "../components/buttons";
import { FileInput } from "../components/inputs";
import Layout from "../components/layout";
import { CLOUDINARY_BASE } from "../lib/constants";

const Page = () => {
  const [file, setFile] = useState(undefined);
  const [imagePreview, setImagePreview] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const downloadRef = useRef(null);

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
      {Boolean(file) && (
        <Fragment>
          <div className="top-right">
            <Button onClick={clearFile}>New</Button>
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
            <a href={imagePreview} download hidden ref={downloadRef}>
              Download
            </a>
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
        .img {
          width: 320px;
          height: 320px;
          object-fit: contain;
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
