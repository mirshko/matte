"use server";

import sharp from "sharp";
import { zact } from "zact/server";
import { z } from "zod";
import backgrounds, { BackgroundColors } from "./backgrounds";

export const mat = zact(
  z.object({
    base64: z.string(),
    color: z.string(),
  })
)(async ({ base64, color }) => {
  const uri = Buffer.from(base64.split(";base64,").pop(), "base64");

  const original = sharp(uri);

  const metadata = await original.metadata();

  const dimensions = Math.max(metadata.width, metadata.height);

  const matted = original.resize({
    width: dimensions,
    height: dimensions,
    fit: "contain",
    background: backgrounds[color as BackgroundColors],
  });

  const buf = await matted.withMetadata().toBuffer();

  return `data:image/${metadata.format};base64,${buf.toString("base64")}`;
});
