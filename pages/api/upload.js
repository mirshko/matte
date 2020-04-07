import sharp from "sharp";

const BACKGROUNDS = {
  white: { r: 255, g: 255, b: 255, alpha: 1 },
  black: { r: 0, g: 0, b: 0, alpha: 1 },
};

export default async (req, res) => {
  if (req.method === "POST") {
    const { background } = req.query;

    try {
      const upload = await new Promise(async (resolve, reject) => {
        let file = Buffer.from("");

        try {
          await req.on(
            "data",
            (chunk) => (file = Buffer.concat([file, chunk]))
          );

          await req.on("end", () => resolve(file));
        } catch (err) {
          reject(err);
        }
      });

      const original = sharp(upload);

      const metadata = await original.metadata();

      const dimensions = Math.max(metadata.width, metadata.height);

      const matted = await original
        .resize({
          width: dimensions,
          height: dimensions,
          fit: "contain",
          background: BACKGROUNDS[background],
        })
        .withMetadata()
        .toBuffer();

      res.status(200).send(matted);
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: err.message });
    }

    return;
  }

  res.status(405).send("Method Not Allowed");
};

export const config = {
  api: {
    bodyParser: false,
  },
};
