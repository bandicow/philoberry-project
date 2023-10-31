import express from "express";
import AWS from "aws-sdk";
import prisma from "../lib/prisma";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const router = express.Router();

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const newArtworks = await prisma.artwork.findMany({
      where: { artist_name: String(name) },
    });

    const updatedArtworks = await Promise.all(
      newArtworks.map(async (artwork) => {
        const s3_Key = artwork.s3key;

        if (!s3_Key) return artwork;

        const signedUrlParams = {
          Bucket: process.env.S3_BUCKET || "",
          Key: s3_Key,
          Expires: 3600,
        };

        const presignedUrl = await s3.getSignedUrlPromise(
          "getObject",
          signedUrlParams
        );

        return { ...artwork, s3key: presignedUrl };
      })
    );
    return res.status(200).json(updatedArtworks);
  } catch (err) {
    console.error("Failed to generate S3 image URLs", err);
    return res.status(500).json({ message: "작품 불러오기 실패" });
  }
});

export default router;
