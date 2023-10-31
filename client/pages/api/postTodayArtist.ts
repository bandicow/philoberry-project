import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { PickArtist } from "@prisma/client";

export default async function postTodayArtist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { artist_name }: PickArtist = req.body;

      const todayArtist = await prisma.pickArtist.update({
        where: {
          id: 100,
        },
        data: {
          artist_name: artist_name,
        },
      });

      return res.status(201).json({ artistName: todayArtist.artist_name });
    } catch (error) {
      console.log(error, "서버 에러");
      return res.status(404).json({ message: "아티스트 이름 변경 실패" });
    }
  }
}
