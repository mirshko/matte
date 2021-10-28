import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import BACKGROUNDS, { BackgroundColors } from "../../lib/backgrounds";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer | { success: boolean; error: string }>
) {
  if (req.method === "POST") {
    const { color } = req.query;

    try {
      const upload = await new Promise<Buffer>((resolve, reject) => {
        let file = Buffer.from("");

        try {
          req.on("data", (chunk) => (file = Buffer.concat([file, chunk])));

          req.on("end", () => resolve(file));
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
      res.status(400).json({
        success: false,
        error: err.message,
      });
    }

    return;
  }

  res.status(405).json({
    success: false,
    error: "Method Not Allowed",
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
