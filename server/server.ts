import dotenv from "dotenv";
import express, { Request, Response } from "express";

import cors from "cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();
const dev = process.env.NODE_ENV !== "production";
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares 적용
app.use(cors());
app.use(express.json());

//** 모든 작가 정보 가져오기 */
app.get("/api/getArtist", async (req: Request, res: Response) => {
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
});

//** 콜라보 작가 이름 가져오기 */
app.get("/api/getTodayArtist", async (req: Request, res: Response) => {
  try {
    const todayArtist = await prisma.pickArtist.findFirst();
    if (todayArtist) {
      return res.json({ artistName: todayArtist.artist_name });
    } else {
      return res.json({ artistName: "???" });
    }
  } catch (error) {
    console.log(error, "서버 에러");
    return res.status(404).json({ message: "아티스트 이름 불러오기 실패" });
  }
});

app.get("/api/home", (req: Request, res: Response) => {
  res.json({ message: "Like this video!", people: ["Arpan", "Jack", "Barry"] });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
