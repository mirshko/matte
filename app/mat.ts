"use server";

import { colord } from "colord";
import sharp from "sharp";
import { zact } from "zact/server";
import { z } from "zod";

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

  const { r, g, b } = colord(color).toRgb();

  const matted = original.resize({
    width: dimensions,
    height: dimensions,
    fit: "contain",
    background: { r, g, b, alpha: 1 },
  });

  const buf = await matted.withMetadata().toBuffer();

  return `data:image/${metadata.format};base64,${buf.toString("base64")}`;
});
