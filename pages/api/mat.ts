import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import BACKGROUNDS, { BackgroundColors } from "../../lib/backgrounds";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { color } = req.query;

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
          background: BACKGROUNDS[color as BackgroundColors],
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
}

export const config = {
  api: {
    bodyParser: false,
  },
};
