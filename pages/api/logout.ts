import { NextApiResponse } from "next";
import cookie from "cookie";
import { authorization } from "./middlewares";
import { NextApiRequestAuthenticated } from "../../Shared/shared.interface";

export const Logout = async (
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("authorization", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      }),
    ]);
    return res.status(200).json({
      message: "Logout successfully.",
    });
  } else
    return res.status(405).json({
      message: "Method not allowed",
    });
};

export default authorization(Logout);
