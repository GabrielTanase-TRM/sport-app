import { NextApiResponse } from "next";
import { isEmpty } from "lodash";
import { authorization } from ".";
import { prisma } from "./index";
import { NextApiRequestAuthenticated } from "../../shared/shared.interface";
require("dotenv").config({ path: "../../.env" });

export const GetUser = async (
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
      return res.status(200).json({
        ...user,
      });
    } else {
      return res.status(401).json({
        message: "Can't find the user.",
      });
    }
  } else {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }
};

export default authorization(GetUser);
