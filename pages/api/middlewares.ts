import { NextApiHandler, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { NextApiRequestAuthorized } from "../../shared/shared.interface";
import { Paths } from "../../shared/paths.const";

export const authorization =
  (fn: NextApiHandler) =>
  async (req: NextApiRequestAuthorized, res: NextApiResponse) => {
    return verify(
      req.cookies.authorization,
      process.env.JWT_KEY,
      async (err, decoded) => {
        if (!err && decoded) {
          req.decoded = decoded;
          return await fn(req as NextApiRequestAuthorized, res);
        }

        return res.redirect(401, Paths.Authentication.path);
      }
    );
  };
