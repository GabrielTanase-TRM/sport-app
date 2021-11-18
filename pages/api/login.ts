import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { isEmpty } from "lodash";
import { sign } from "jsonwebtoken";
import cookie from "cookie";
require("dotenv").config({ path: "../../.env" });

const prisma = new PrismaClient();

export const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await prisma.users.findFirst(email);

    if (!isEmpty(user)) {
      compare(password, user.password, (err, result) => {
        if (!err && result) {
          const claims = { id: user.id, email: email };
          const JWT = sign(claims, process.env.JWT_KEY, { expiresIn: "1h" });

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("authorization", JWT, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 3600, // same as token expiresIn
              path: "/",
            })
          );
          return res.status(200).json({
            message: "Login successfully.",
          });
        } else
          return res.status(401).json({
            message: "Email or password incorrect.",
          });
      });
    } else {
      return res.status(401).json({
        message: "Email or password incorrect.",
      });
    }
  } else {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }
};

export default Login;
