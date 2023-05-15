"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
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
  const [color, colorSet] = useState<string>("#ffffff");
  const [fileData, fileDataSet] = useState<File>();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.at(0)) {
        const file = acceptedFiles.at(0);

        const imageBitmap = await createImageBitmap(file);

        const mattedImage = await applyPhotoMat(imageBitmap, color);

        fileDataSet(
          new File([mattedImage], `${file.name} - Matted`, {
            type: "image/jpeg",
          })
        );
      }
    },
    [color, fileDataSet]
  );

  const saveFile = () => {
    const objectUrl = URL.createObjectURL(fileData);

    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = fileData.name;
    anchor.click();

    URL.revokeObjectURL(objectUrl);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    onDropRejected(fileRejections) {
      window.alert(fileRejections.at(0).errors.at(0).message);
    },
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="relative md:p-[74px] w-96 h-96 md:w-[40rem] md:h-[40rem] flex">
        {fileData ? (
          <img
            className="object-contain aspect-square w-full h-full"
            alt=""
            src={URL.createObjectURL(fileData)}
          />
        ) : (
          <div
            className="w-full h-full object-contain flex items-center justify-center relative group"
            style={{ backgroundColor: color }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            <svg
              className="h-full aspect-[3/4] border border-gray-300 bg-gray-50 text-gray-300 group-hover:text-indigo-300 group-hover:border-indigo-300 group-hover:bg-indigo-50"
              preserveAspectRatio="none"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeWidth={1}
                d="M0 0l200 200M0 200L200 0"
              />
            </svg>
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

      <div className="flex justify-between gap-8">
        <label
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 font-mono cursor-pointer"
          htmlFor="color"
        >
          <span>{color}</span>

          <input
            className="sr-only"
            id="color"
            type="color"
            value={color}
            onChange={(event) => colorSet(event.target.value)}
          />
        </label>

        {fileData && (
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              onClick={() => saveFile()}
              type="button"
            >
              Save
            </button>

            <button
              className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              onClick={() => fileDataSet(undefined)}
              type="button"
            >
              Restart
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
