import express from "express";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import prisma from "../lib/prisma";

const router = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  },
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productInfo = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    const productImages = await prisma.productImage.findMany({
      where: { productId: Number(id) },
    });

    const updatedProducts = await Promise.all(
      productImages.map(async (product) => {
        const s3_Key = product.s3key;

        if (!s3_Key) return null;

        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET || "",
          Key: s3_Key,
        });

        let presignedUrl;

        try {
          presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600 * 24,
          });
        } catch (err) {
          console.log("Error creating presigned URL", err);
        }

        return presignedUrl;
      })
    );

    const validUrls = updatedProducts.filter((url) => url !== null);

    const data = { ...productInfo, s3key: validUrls };

    if (!productInfo) {
      return res.status(404).json({ error: "productInfo not found" });
    }

    return res.status(200).json(data);
  } catch (e) {
    console.error("제품정보를 불러오는데 실패하였습니다.", e);
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;
