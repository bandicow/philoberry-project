import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function editProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      try {
        const productsName = await prisma.product.findMany({
          select: {
            name: true,
            price: true,
            category: true,
            color: true,
            size: true,
            details: true,
            stock: true,
          },
        });

        return res.status(200).json(productsName);
      } catch (err) {
        err;
        return res.status(404).json({ message: "제품 이름 불러오기 실패" });
      }
    }

    // if (req.method === "POST") {
    //   const result = await prisma.product.update({
    //     where: {
    //       name: "alice@prisma.io",
    //     },
    //     data: {},
    //   });
    // }
  } catch (error) {
    console.log(error, "제픔 수정 실패");
  }
}
