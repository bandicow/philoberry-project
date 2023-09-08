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
    // S3 getObject 메서드를 사용하여 이미지 URL 생성
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: "35mm_logo_main-removebg.png", // 로드할 실제 파일 이름으로 대체해야 함
    };

    const signedUrl = await s3.getSignedUrlPromise("getObject", params);

    res.status(200).json({ url: signedUrl });
  } catch (error) {
    console.error("Failed to generate S3 image URL", error);
    res.status(500).json({ error: "Failed to generate image URL" });
  }
}
