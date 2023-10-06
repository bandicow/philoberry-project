import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default async function productLoad(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // GET 요청 처리
    if (req.method === "GET") {
      const allProducts = await prisma.product.findMany();

      const updatedProducts = await Promise.all(
        allProducts.map(async (product) => {
          // 제품 이름에 따라 S3 버킷의 폴더 위치 결정
          const s3_Key = product.mainImage;

          if (!s3_Key) return product;

          const signedUrlParams = {
            Bucket: process.env.S3_BUCKET || "",
            Key: s3_Key,
            Expires: 3600 * 24,
          };

          const presignedUrl = await s3.getSignedUrlPromise(
            "getObject",
            signedUrlParams
          );

          return { ...product, mainImage: presignedUrl };
        })
      );

      return res.status(200).json(updatedProducts);
    }
  } catch (e) {
    console.error("Failed to generate S3 image URLs", e);
    return res.status(500).json({ message: "Server Error" });
  }
}
