import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import prisma from "../../lib/prisma";
import { Artwork } from "@prisma/client";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default async function postArtwork(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const artworkData: Artwork = req.body;

    // S3 이미지 업로드 후 Key받아오기(null 일때 s3 막 업로드된거 delete, create X)
    if (!artworkData.s3key) {
      const folder = `${artworkData.artist_name}/`; // 삭제하려는 폴더 이름// 해당 폴더에 속한 모든 객체를 나열합니다.

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

    const artworkInfo = await prisma.artwork.create({
      data: {
        title: artworkData.title,
        artist_name: artworkData.artist_name,
        s3key: artworkData.s3key,
        description: artworkData.description,
        material: artworkData.material,
        size: artworkData.size,
        price: artworkData.price,
        isSold: artworkData.isSold,
        createdAt: artworkData.createdAt,
        order: artworkData.order,
      },
    });

    return res.status(201).json(artworkInfo);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: "작품 업로드 요청 실패" });
  }
}
