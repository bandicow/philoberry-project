import { Artwork } from "@prisma/client";
import express from "express";
import prisma from "../lib/prisma";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  },
});

const router = express.Router();

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const newArtworks = await prisma.artwork.findMany({
      where: { artist_name: String(name) },
    });

    const updatedArtworks = await Promise.all(
      newArtworks.map(async (artwork: Artwork) => {
        const s3_Key = artwork.mainImage;

        if (!s3_Key) return artwork;

        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET || "",
          Key: s3_Key,
        });

        let presignedUrl;

        try {
          presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });
        } catch (err) {
          console.log("Error creating presigned URL", err);
        }

        return { ...artwork, mainImage: presignedUrl };
      })
    );
    return res.status(200).json(updatedArtworks);
  } catch (err) {
    console.error("Failed to generate S3 image URLs", err);
    return res.status(500).json({ message: "작품 불러오기 실패" });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const artwork = await prisma.artwork.findUnique({
      where: { artwork_id: id },
    });

    const artworkImages = await prisma.artworkImage.findMany({
      where: { artworkId: id },
    });

    const updatedArtworks = await Promise.all(
      artworkImages.map(async (image) => {
        const s3_Key = image.s3key;

        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET || "",
          Key: s3_Key,
        });

        let presignedUrl;

        try {
          presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });
        } catch (err) {
          console.log("Error creating presigned URL", err);
        }

        return presignedUrl;
      })
    );

    return res.status(200).json({ ...artwork, artworkImages: updatedArtworks });
  } catch (err) {
    console.error("Failed to generate S3 image URLs", err);
    return res.status(500).json({ message: "작품 불러오기 실패" });
  }
});

export default router;
