import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function editProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      try {
        const productEditData = req.body;

        const editProduct = await prisma.product.update({
          where: {
            id: productEditData.id,
          },
          data: {
            name: productEditData.name,
            category: productEditData.category,
            price: productEditData.price,
            color: productEditData.color,
            size: productEditData.size,
            details: productEditData.details,
            stock: productEditData.stock,
          },
        });

        return res
          .status(201)
          .json({ product: editProduct, message: "제품 수정 완료" });
      } catch (err) {
        console.error(err);
        return res.status(404).json({ message: "제품 수정 실패" });
      }
    }
  } catch (error) {
    console.log(error, "제픔 수정 실패");
  }
}
