export function getDataURLFromFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.toString());
    reader.onerror = reject;
  });
}

export async function getDataURLFromFileAlt(file: File) {
  let reader = new FileReader();

  return await new Promise((resolve) => {
    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result);
      },
      false
    );
    reader.readAsDataURL(file);
  });
}

export function matImage({
  dataURL,
  color,
}: {
  dataURL: string;
  color: string;
}) {
  let canvas = document.createElement("canvas");

  return new Promise<string>((resolve, reject) => {
    canvas.addEventListener("error", reject);

    let _image: HTMLImageElement;

    if (dataURL) {
      let image = new window.Image();
      image.src = dataURL;
      _image = image;
    } else {
      reject("Pass an image or a dataURL");
    }

    _image.addEventListener("error", reject);

    const { naturalWidth, naturalHeight } = _image;

    const maxDimension = Math.max(naturalHeight, naturalWidth);

    canvas.width = maxDimension;
    canvas.height = maxDimension;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const x = canvas.width / 2 - naturalWidth / 2;
    const y = canvas.height / 2 - naturalHeight / 2;

    ctx.drawImage(_image, x, y, naturalWidth, naturalHeight);

    const base64Image = canvas.toDataURL("image/jpeg", 1);

    resolve(base64Image);
  });
}
