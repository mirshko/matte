import Layout from "../components/layout";
import { Button } from "../components/buttons";
import { FileInput } from "../components/inputs";
import { useTransition, animated, config } from "react-spring";

const Image = ({ src }) => {
  const [state, toggle] = React.useState(true);

  const transitions = useTransition(state, null, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
    config: { mass: 1, tension: 180, friction: 15 }
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && <animated.img className="img" src={src} key={key} style={props} />
  );
};

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

      {/* {!!file && (
        <div className="bottom-centered">
          <Button>Save</Button>
        </div>
      )} */}

      <div className="content">
        {!file && <FileInput onChange={handleFileChange} />}

        {!!file && <Image src={file} alt="" />}
      </div>

      <style jsx global>{`
        .img {
          background-color: white;
          width: 320px;
          height: 320px;
          object-fit: contain;
        }
      `}</style>

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
          height: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default Page;
