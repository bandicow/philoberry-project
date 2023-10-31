import { NextApiRequest, NextApiResponse } from "next";
import { NewProduct } from "../../src/Types/Product";
import AWS from "aws-sdk";
import prisma from "../../lib/prisma";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default async function productUpload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      try {
        // POST 요청 처리: 새로운 Product 생성
        const productData: NewProduct = req.body;

        // S3 이미지 업로드 후 Key받아오기(null 일때 s3 막 업로드된거 delete, create X)
        if (!productData.mainImage) {
          const folder = `${productData.name}/`; // 삭제하려는 폴더 이름// 해당 폴더에 속한 모든 객체를 나열합니다.
          const listParams = {
            Bucket: process.env.S3_BUCKET as string,
            Prefix: folder,
          };
          try {
            const nullData = await s3.listObjectsV2(listParams).promise();

            if (!nullData.Contents || nullData.Contents.length === 0) return;

            // 나열된 각 객체를 삭제합니다.
            const deleteParams = {
              Bucket: process.env.S3_BUCKET as string,
              Delete: { Objects: [] as Array<{ Key: string }> },
            };

            nullData.Contents.forEach(({ Key }) => {
              // Key가 undefined인 경우를 대비한 체크 및 성공시 key를 deleteParams에 추가합니다
              if (Key) {
                deleteParams.Delete.Objects.push({ Key });
              }
            });
            await s3.deleteObjects(deleteParams).promise();
          } catch (err) {
            console.log("RDS업로드 실패로 인한 S3 이미지 삭제 실패", err);
          }
          return res
            .status(200)
            .json({ message: "Images deleted successfully from S3" });
        }

        const uploadedImageUrls = productData.productImages;

        const newProduct = await prisma.product.create({
          data: {
            name: productData.name,
            category: productData.category,
            price: productData.price,
            material: productData.material,
            color: productData.color,
            size: productData.size,
            details: productData.details,
            precautions: productData.precautions,
            url: productData.url,
            seller: productData.seller,
            stock: productData.stock,
            createdAt: new Date(),
            mainImage:
              productData.mainImage && productData.mainImage.length > 0
                ? productData.mainImage
                : null,
          },
        });
        console.log(uploadedImageUrls + "잘되냐?");

        // 각각의 이미지 URL을 ProductImage 테이블에 저장합니다.
        if (uploadedImageUrls && uploadedImageUrls.length > 0) {
          for (let imageUrl of uploadedImageUrls) {
            await prisma.productImage.create({
              data: {
                s3key: imageUrl,
                productId: newProduct.id,
              },
            });
          }
        }
        return res.status(201).json(newProduct);
      } catch (error) {
        console.log(error);
      }
    }
    return res
      .status(405)
      .json({ message: `Method '${req.method}' Not Allowed` });
  } catch (e) {
    console.error(e);

    return res.status(500).json({ message: "Server Error" });
  }
}
