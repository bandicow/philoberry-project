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

export default async function Prismasql(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      try {
        // POST 요청 처리: 새로운 Product 생성
        const productData: NewProduct = req.body;
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
            mainImageUrl:
              productData.mainImageUrl && productData.mainImageUrl.length > 0
                ? productData.mainImageUrl
                : null,
          },
        });

        // 각각의 이미지 URL을 ProductImage 테이블에 저장합니다.
        if (uploadedImageUrls && uploadedImageUrls.length > 0) {
          for (let imageUrl of uploadedImageUrls) {
            await prisma.productImage.create({
              data: {
                url: imageUrl,
                productId: newProduct.id,
              },
            });
          }

          return res.status(201).json(newProduct);
        }
      } catch (error) {
        // S3 이미지 업로드 후 url받아오기(실패시 rds도 X , 성공시 rds에 저장, rds 실패 시 s3 막 업로드된거 delete)
        console.log(error);
        const productData: NewProduct = req.body;

        const folder = `${productData.name}/`; // 삭제하려는 폴더 이름// 해당 폴더에 속한 모든 객체를 나열합니다.
        const listParams = {
          Bucket: process.env.S3_BUCKET as string,
          Prefix: folder,
        };

        s3.listObjectsV2(listParams, function (err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            if (!data.Contents || data.Contents.length === 0) return;

            // 나열된 각 객체를 삭제합니다.
            const deleteParams = {
              Bucket: process.env.S3_BUCKET as string,
              Delete: { Objects: [] as Array<{ Key: string }> },
            };

            data.Contents.forEach(({ Key }) => {
              if (Key) {
                // Key가 undefined인 경우를 대비한 체크
                deleteParams.Delete.Objects.push({ Key });
              }
            });

            s3.deleteObjects(deleteParams, function (err, data) {
              if (err)
                console.log("RDS업로드 실패로 인한 S3 이미지 삭제 실패", err);
              else console.log("RDS업로드 실패로 인한 S3 이미지 삭제", data);
            });
          }
        });
        return res
          .status(500)
          .json({ message: `Server Error RDS 업로드 및 S3 이미지 삭제 실패` });
      }
    }

    if (req.method === "GET") {
      try {
        // GET 요청 처리
        const allProducts = await prisma.product.findMany();

        const updatedProducts = await Promise.all(
          allProducts.map(async (product) => {
            // 제품 이름에 따라 S3 버킷의 폴더 위치 결정
            const folder = `${product.name}/`;

            // 해당 폴더 내의 모든 객체를 나열합니다.
            const listParams = {
              Bucket: process.env.S3_BUCKET as string,
              Prefix: folder,
            };

            const data = await s3.listObjectsV2(listParams).promise();

            if (!data.Contents || data.Contents.length === 0) return product;

            // 나열된 첫 번째 객체에 대해 Presigned URL 생성
            const objectKey = data.Contents[0].Key;

            if (!objectKey) return product;

            const signedUrlParams = {
              Bucket: process.env.S3_BUCKET || "",
              Key: objectKey,
            };

            const presignedUrl = await s3.getSignedUrlPromise(
              "getObject",
              signedUrlParams
            );

            return { ...product, mainImageUrl: presignedUrl };
          })
        );

        console.log(updatedProducts, "S3세일에서 받아오는 url");

        return res.status(200).json(updatedProducts);
      } catch (e) {
        console.error(e);

        return res.status(500).json({ message: "Server Error" });
      }
    }

    await prisma.$disconnect();

    return res
      .status(405)
      .json({ message: `Method '${req.method}' Not Allowed` });
  } catch (e) {
    console.error(e);

    return res.status(500).json({ message: "Server Error" });
  }
}
