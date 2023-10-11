import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function getbackGroundColorHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const bgColor = await prisma.setting.findFirst();
    if (bgColor) {
      await prisma.$disconnect();
      return res.json({ backgroundColor: bgColor.backgroundColor });
    } else {
      return res.json({ backgroundColor: "#FFFFFF" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ color: "No settings found" });
  }
}
