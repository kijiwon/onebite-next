import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // res에서 revalidate 객체에 revalidate(재생성) 시킬 경로를 전달
    await res.revalidate("/");
    // 재생성 결과를 응답
    return res.json({ revalidate: true });
  } catch (err) {
    // 실패시 메세지 전달
    res.status(500).send("Revalidation Failed");
  }
}
