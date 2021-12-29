import { NextApiHandler, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { NextApiRequestAuthenticated } from "../../Shared/shared.interface";
require("dotenv").config({ path: "../../.env" });

export const authorization =
  (fn: NextApiHandler) =>
  async (req: NextApiRequestAuthenticated, res: NextApiResponse) => {
    return verify(
      req.cookies.authorization,
      process.env.JWT_KEY,
      async (err, decoded) => {
        if (!err && decoded) {
          req.decoded = decoded;
          return await fn(req as NextApiRequestAuthenticated, res);
        }
        // res.writeHead(302, { Location: "/login" });
        return res.status(401).json({
          message: "You have no authorization for this request.",
        });
      }
    );
  };
