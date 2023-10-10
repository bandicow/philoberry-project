import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default async function productDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // GET 요청 처리
    if (req.method === "GET") {
      const id = req.query.id;
      const productInfo = await prisma.product.findUnique({
        where: { id: Number(id) },
      });

      const productImages = await prisma.productImage.findMany({
        where: { productId: Number(id) },
      });

      //이미지 받아오고 제품 정보와 이미지들을 하나의 객체로 합치기
      const updatedProducts = await Promise.all(
        productImages.map(async (product) => {
          // 제품 이름에 따라 S3 버킷의 폴더 위치 결정
          const s3_Key = product.s3key;

          if (!s3_Key) return null; // If there's no s3_Key, return null

          const signedUrlParams = {
            Bucket: process.env.S3_BUCKET || "",
            Key: s3_Key,
            Expires: 3600 * 24,
          };

          const presignedUrl = await s3.getSignedUrlPromise(
            "getObject",
            signedUrlParams
          );

          return presignedUrl; // Return the presigned URL for each productImage
        })
      );

      // Filter out any null values from the array
      const validUrls = updatedProducts.filter((url) => url !== null);

      const data = { ...productInfo, s3key: validUrls };

      // 제품 정보가 없는 경우 404 에러 반환
      if (!productInfo) {
        return res.status(404).json({ error: "productInfo not found" });
      }

      // 제품 정보 반환
      return res.status(200).json(data);
    }
  } catch (e) {
    console.error("제품정보를 불러오는데 실패하였습니다.", e);
    return res.status(500).json({ message: "Server Error" });
  }
}
