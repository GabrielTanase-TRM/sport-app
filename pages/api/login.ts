import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { compare } from "bcrypt";
import { isEmpty } from "lodash";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

export const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!isEmpty(user)) {
      compare(password, user.password, async (err, result) => {
        if (!err && result) {
          const claims = { id: user.id, email: email };
          const JWT = sign(claims, process.env.JWT_KEY, {
            expiresIn: 172800000,
          });
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("authorization", JWT, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 172800000, // same as token expiresIn
              path: "/",
            })
          );
          res.status(200).json({
            message: "Login successfully.",
          });
          res.end();
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
