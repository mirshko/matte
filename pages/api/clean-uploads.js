import { v2 as cloudinary } from "cloudinary";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const api = cloudinary.api;

export default async (req, res) => {
  try {
    const { resources } = await api.resources_by_tag("matte.pics");

    const stale_resources = resources
      .filter(({ created_at }) => {
        const tenMinutesAgo = dayjs.utc().subtract(10, "minute");

        return dayjs(created_at).isBefore(tenMinutesAgo);
      })
      .map(({ public_id }) => public_id);

    if (stale_resources.length) await api.delete_resources(stale_resources);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false });
  }
};
