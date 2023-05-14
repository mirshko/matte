"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import frame from "./frame_alt.png";

function applyPhotoMat(imageBitmap: ImageBitmap, color: string) {
  const { width, height } = imageBitmap;

  const maxDimension = Math.max(width, height);

  const canvas = document.createElement("canvas");

  canvas.width = maxDimension;
  canvas.height = maxDimension;

  /**
   * @todo Move to OffscreenCanvas?
   */
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const x = canvas.width / 2 - width / 2;
  const y = canvas.height / 2 - height / 2;

  ctx.drawImage(imageBitmap, x, y, width, height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject()), "image/jpeg", 1);
  });
}

export default function Page() {
  const download = useRef<HTMLAnchorElement>(null);

  const [fileName, fileNameSet] = useState<string>();
  const [color, colorSet] = useState<string>("#ffffff");
  const [fileDataURL, fileDataURLSet] = useState<string>();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.at(0)) {
        const file = acceptedFiles.at(0);

        fileNameSet(file.name);

        const imageBitmap = await createImageBitmap(file);

        const mattedImage = await applyPhotoMat(imageBitmap, color);

        const objectUrl = URL.createObjectURL(mattedImage);

        fileDataURLSet(objectUrl);
      }
    },
    [color, fileNameSet, fileDataURLSet]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 4.8e6,
    onDropRejected(fileRejections) {
      window.alert(fileRejections.at(0).errors.at(0).message);
    },
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  return (
    <>
      <div className="relative md:p-[74px] w-96 h-96 md:w-[40rem] md:h-[40rem]">
        {fileDataURL ? (
          <div className="w-full h-full">
            <img
              className="object-contain align-middle aspect-square w-full h-full"
              alt={fileName}
              src={fileDataURL}
            />
            <a hidden ref={download} download={fileName} href={fileDataURL} />
          </div>
        ) : (
          <div
            className={`w-full h-full object-contain flex items-center`}
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

        <div className="hidden absolute inset-0 w-full h-full md:flex pointer-events-none">
          <Image
            alt=""
            draggable={false}
            height={720}
            priority
            src={frame}
            width={720}
          />
        </div>
      </div>

      <div className="fixed top-8 left-8">
        <label htmlFor="color">
          <p className="block text-sm font-medium leading-6 text-gray-900">
            Matte Color
          </p>

          <div className="flex gap-2 items-center mt-1">
            <input
              className="appearance-none"
              id="color"
              type="color"
              name="color"
              value={color}
              onChange={(event) => colorSet(event.target.value)}
            />
            <p className="text-black text-sm font-semibold">{color}</p>
          </div>
        </label>
      </div>

      {fileDataURL && (
        <div className="fixed inset-x-8 mx-auto bottom-8 flex justify-center gap-8">
          <button
            className="p-4 bg-black text-white"
            onClick={() => {
              download.current.click();
              URL.revokeObjectURL(fileDataURL);
            }}
          >
            Save
          </button>

          <button
            className="p-4 bg-black text-white"
            onClick={() => {
              fileDataURLSet(undefined);
              fileNameSet(undefined);
            }}
          >
            New
          </button>
        </div>
      )}
    </>
  );
}
