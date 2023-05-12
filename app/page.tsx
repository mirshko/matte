"use client";

import { useRef, useState } from "react";
import { useDrop, useStateList } from "react-use";
import { useZact } from "zact/client";
import backgrounds from "../lib/backgrounds";
import { mat } from "../lib/mat";
import toBase64 from "../lib/toBase64";

export default function Page() {
  const download = useRef<HTMLAnchorElement>(null);

  const [file, setFile] = useState<File>(undefined);

  const { state, next } = useStateList(Object.keys(backgrounds));

  const { mutate, data } = useZact(mat);

  useDrop({
    onFiles: (files) => {
      handleSetFile(files[0]);
    },
  });

  const handleSetFile = async (file: File) => {
    if (!file.type.includes("image")) {
      window.alert("Not An Image\nThis file type is not allowed.");
      return;
    }

    /**
     * Seems its not truly 5 MB, perhaps due to the encoding of the image being sent to the server being larger than the actual image in the finder.
     */
    if (file.size > 4.8e6) {
      window.alert("Picture Too Large\nThis image is greater than 5 MB.");
      return;
    }

    setFile(file);

    const base64 = await toBase64(file);

    await mutate({ base64, color: state });
  };

  return (
    <>
      <div className="middle-centered">
        {data ? (
          <>
            <img className="img" alt={file.name} src={data} />
            <a hidden ref={download} download={file.name} href={data} />
          </>
        ) : (
          <>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={(event) => handleSetFile(event.target.files[0])}
            />
            <label htmlFor="file">
              <span>Drag & Drop or Browse</span>
            </label>
          </>
        )}
      </div>

      <div className="bottom-right z-max button-stack">
        <button onClick={() => next()}>{state}</button>
      </div>

      {data && (
        <div className="bottom-centered z-max">
          <button onClick={() => download.current.click()}>Save</button>
        </div>
      )}
    </>
  );
}
