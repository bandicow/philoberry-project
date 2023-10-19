import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function checkIsAdmin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return res.status(200).json(user?.isAdmin ?? false);
  } catch (error) {
    console.log(error, "확인 실패");
    return res.status(404).json({ message: "관리자 확인 실패" });
  }
}
