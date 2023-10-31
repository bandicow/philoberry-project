import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function editProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      try {
        const productsName = await prisma.product.findMany({
          select: {
            id: true,
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
  } catch (error) {
    console.log(error, "서버 에러");
  }
}
