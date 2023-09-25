// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const productImage = req.body;
    const file = productImage.file;

    const fileName = `${productImage.name}/${Date.now()}-${file.name}`;

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      ContentType: productImage.type,
    };

    try {
      const uploadURL = await s3.getSignedUrlPromise("putObject", params);
      res.status(200).json({ url: uploadURL });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: "Method not supported" });
  }
}
