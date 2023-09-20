// pages/api/setBackgroundColor.ts

import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  color?: string;
  message?: string;
};

export default function setBackgroundColorHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const color = req.body.color;

    try {
      // 색상 정보를 파일에 저장합니다.
      fs.writeFileSync(path.resolve("./color.txt"), color);

      res.status(200).json({ color });
    } catch (error) {
      console.error(error);

      // 서버 오류 시 상태 코드와 메시지를 반환합니다.
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
