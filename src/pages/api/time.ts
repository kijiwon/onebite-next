// type을 붙여 타입을 import함을 명시
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  res.status(200).json({ time: date.toLocaleString() });
}
