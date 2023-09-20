import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  color: string;
};

export default function getbackGroundColorHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const color = fs.readFileSync(path.resolve("./color.txt"), "utf-8");

    res.status(200).json({ color });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end("Method ${req.method} not allowed");
  }
}
