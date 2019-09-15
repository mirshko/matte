import Layout from "../components/layout";
import { Button } from "../components/buttons";
import { FileInput } from "../components/inputs";

const Page = () => {
  const [file, setFile] = React.useState();

  const handleFileChange = e => setFile(URL.createObjectURL(e.target.files[0]));

  const clearFile = () => setFile();

  return (
    <Layout>
      {!!file && (
        <div className="top-right">
          <Button onClick={clearFile}>New</Button>
        </div>
      )}

      {!!file && (
        <div className="bottom-centered">
          <Button>Save</Button>
        </div>
      )}

      <div className="content">
        {!file && <FileInput onChange={handleFileChange} />}

        {!!file && <img src={file} alt="" />}
      </div>

      <style jsx>{`
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

        .content {
          display: grid;
          place-items: center;
          min-height: 100%;
        }

        img {
          background-color: white;
          width: 320px;
          height: 320px;
          object-fit: contain;
        }
      `}</style>
    </Layout>
  );
};

export default Page;
