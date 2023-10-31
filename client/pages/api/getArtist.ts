import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function getArtist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const artistInfo = await prisma.artist.findMany({
      select: {
        artist_id: true,
        name: true,
      },
    });

    return res.status(200).json(artistInfo);
  } catch (error) {
    console.log(error, "서버 에러");
    return res.status(404).json({ message: "아티스트 이름 불러오기 실패" });
  }
}
