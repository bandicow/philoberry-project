import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function setBackgroundColorHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { backgroundColor }: { backgroundColor: string } = req.body;

    try {
      // 색상 정보를 파일에 저장합니다.

      await prisma.setting.update({
        where: { id: 1 },
        data: { backgroundColor },
      });
      await prisma.$disconnect();
      return res.status(200).json({ backgroundColor });
    } catch (error) {
      console.error(error);
      // 서버 오류 시 상태 코드와 메시지를 반환합니다.
      return res.status(500).json({ color: "Internal Server Error" });
    }
  }
  if (req.method === "GET") {
    try {
      const bgColor = await prisma.setting.findFirst();
      if (bgColor) {
        await prisma.$disconnect();
        return res.json({ backgroundColor: bgColor.backgroundColor });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ color: "No settings found" });
    }
  }
  if (req.method !== "POST" && req.method !== "GET") {
    // POST 또는 GET 이외의 메서드에 대한 요청을 처리합니다.

    return res
      .status(405)
      .json({ message: `Method '${req.method}' Not Allowed` });
  }
}
