import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { authorization } from ".";

export const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("authorization", "", {
        maxAge: -1,
        path: "/",
      }),
    ]);
    res.writeHead(302, { Location: "http://localhost:3000/" });
    res.status(200).json({
      status: 200,
      message: "Logout successfully.",
    });
  } else {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }
};

export default authorization(Logout);
