import { NextApiResponse } from "next";
import { isEmpty } from "lodash";
import { authorization } from "../middlewares";
import prisma from "../../../prisma/prisma";
import { NextApiRequestAuthenticated } from "../../../shared/shared.interface";
require("dotenv").config({ path: "../../.env" });

export const GetCurrentUser = async (
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    const user = await prisma.users.findUnique({
      where: {
        id: req.decoded.id,
      },
    });

    if (!isEmpty(user)) {
      return res.status(200).send(user);
    } else {
      return res.status(401).send({
        message: "Can't find the user.",
      });
    }
  } else {
    return res.status(405).send({
      message: "Method not allowed",
    });
  }
};

export default authorization(GetCurrentUser);
