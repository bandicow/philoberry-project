import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default async function getArtwork(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const name = req.query.name;
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
            Expires: 3600 * 24,
          };

          const presignedUrl = await s3.getSignedUrlPromise(
            "getObject",
            signedUrlParams
          );

          return { ...artwork, s3key: presignedUrl };
        })
      );
      return res.status(200).json(updatedArtworks);
    }
  } catch (err) {
    console.error("Failed to generate S3 image URLs", err);
    return res.status(500).json({ message: "작품 불러오기 실패" });
  }
}
