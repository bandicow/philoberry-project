import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function getArtist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const todayArtist = await prisma.pickArtist.findFirst();
    if (todayArtist) {
      return res.json({ artistName: todayArtist.artist_name });
    } else {
      return res.json({ artistName: "미정" });
    }
  } catch (error) {
    console.log(error, "서버 에러");
    return res.status(404).json({ message: "아티스트 이름 불러오기 실패" });
  }
}
