"use client";

import { useCallback, useRef, useState } from "react";
import { mat } from "./mat";
import { getDataURLFromFile, useZact } from "./helpers";
import { useDropzone } from "react-dropzone";

export default function Page() {
  const download = useRef<HTMLAnchorElement>(null);

  const [file, fileSet] = useState<File>(undefined);

  const [color, colorSet] = useState<string>("#ffffff");

  const { mutate, data, reset } = useZact(mat);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      fileSet(file);

      const dataURL = await getDataURLFromFile(file);

      await mutate({ dataURL, color });
    },
    [color, fileSet, mutate]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 4.8e6,
    onDropRejected(fileRejections) {
      if (!fileRejections[0].file.type.includes("image")) {
        window.alert("Not An Image\nThis file type is not allowed.");
      } else {
        window.alert("Picture Too Large\nThis image is greater than 5 MB.");
      }
    },
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  return (
    <>
      {data ? (
        <div className="w-96 h-96 md:w-[40rem] md:h-[40rem]">
          <img
            className="object-contain align-middle aspect-square w-full h-full"
            alt={file.name}
            src={data}
          />
          <a hidden ref={download} download={file.name} href={data} />
        </div>
      ) : (
        <div
          className={`w-96 h-96 md:w-[40rem] md:h-[40rem] object-contain flex items-center`}
          style={{ backgroundColor: color }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          <div className="aspect-[3/2] w-full bg-gray-100 flex items-center justify-center">
            <p className="text-black text-lg font-bold text-center">
              Drag & Drop or Browse
            </p>
          </div>
        </div>
      )}

      <div className="fixed top-8 right-8">
        <input
          id="color"
          type="color"
          name="color"
          value={color}
          onChange={(event) => colorSet(event.target.value)}
        />
      </div>

      {data && (
        <div className="fixed inset-x-8 mx-auto bottom-8 flex justify-center gap-8">
          <button
            className="p-4 bg-black text-white"
            onClick={() => download.current.click()}
          >
            Save
          </button>

          <button className="p-4 bg-black text-white" onClick={() => reset()}>
            New
          </button>
        </div>
      )}
    </>
  );
}
