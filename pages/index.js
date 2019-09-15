import Layout from "../components/layout";
import { New, Save } from "../components/buttons";

import Upload from "../views/upload";
import Edit from "../views/Edit";

const NewButton = () => (
  <div>
    <New />
    <style jsx>{`
      div {
        position: fixed;
        top: 24px;
        right: 24px;
      }
    `}</style>
  </div>
);

const SaveButton = () => (
  <div>
    <Save />
    <style jsx>{`
      div {
        position: fixed;
        bottom: 32px;
        transform: translateX(-50%);
        left: 50%;
      }
    `}</style>
  </div>
);

const Page = () => {
  return (
    <Layout>
      {/* <NewButton /> */}
      {/* <Upload /> */}
      <Edit />
      <SaveButton />
    </Layout>
  );
};

export default Page;
