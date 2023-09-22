import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ProductData } from "../../src/Types/Product";

const prisma = new PrismaClient();

const Prismasql = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      // POST 요청 처리: 새로운 User 생성
      const {
        name,
        category,
        price,
        material,
        color,
        size,
        details,
        precautions,
        url,
        seller,
        stock,
        images,
      }: ProductData = req.body;

      const newUser = await prisma.product.create({
        data: {
          name,
          category,
          price,
          material,
          color,
          size,
          details,
          precautions,
          url,
          seller,
          stock,
          images: {
            create: Array.isArray(images) ? images.map((url) => ({ url })) : [],
          },
        },
      });

      return res.status(201).json(newUser);
    }

    if (req.method === "GET") {
      // GET 요청 처리: 모든 User 조회
      const allArtists = await prisma.artist.findMany();

      return res.status(200).json(allArtists);
    }

    // 지원하지 않는 HTTP 메소드에 대한 에러 응답
    return res
      .status(405)
      .json({ message: `Method '${req.method}' Not Allowed` });
  } catch (e) {
    console.error(e); // 에러 로깅
    return res.status(500).json({ message: "Server Error" });
  }
};

export default Prismasql;
