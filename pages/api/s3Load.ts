import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

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
  try {
    const params = {
      Bucket: process.env.S3_BUCKET || "",
    };

    // List all objects in the bucket.
    const data = await s3.listObjectsV2(params).promise();

    // Generate signed URLs for each object.
    const signedUrls = await Promise.all(
      data.Contents?.map(async (object) => {
        if (object.Key) {
          const signedUrlParams = { Bucket: params.Bucket, Key: object.Key };
          return await s3.getSignedUrlPromise("getObject", signedUrlParams);
        }
        return null;
      }) || []
    );
    console.log(signedUrls[0] + "s3Load 부분 url");
    res.status(200).json({ urls: signedUrls });
  } catch (error) {
    console.error("Failed to generate S3 image URLs", error);
    res.status(500).json({ error: "Failed to generate image URLs" });
  }
}
