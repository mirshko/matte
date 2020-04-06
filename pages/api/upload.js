import { v2 as cloudinary } from "cloudinary";
import { nanoid } from "nanoid";

const uploader = cloudinary.uploader;

export default async (req, res) => {
  if (req.method === "POST") {
    const contentType = req.headers["content-type"];

    try {
      const base64EncodedImage = await new Promise(async (resolve, reject) => {
        let file = Buffer.from("");

        try {
          await req.on(
            "data",
            (chunk) => (file = Buffer.concat([file, chunk]))
          );

          await req.on("end", () => {
            const base64 = file.toString("base64");

            const base64Image = `data:${contentType};base64,${base64}`;

            resolve(base64Image);
          });
        } catch (err) {
          reject(err);
        }
      });

      const { secure_url, public_id } = await uploader.upload(await base64EncodedImage, {
        resource_type: "image",
        public_id: "uploads/" + nanoid(),
        tags: "matte.pics"
      });

      res.status(200).json({
        success: true,
        message: "Image Uploaded",
        secure_url,
        public_id,
      });
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
