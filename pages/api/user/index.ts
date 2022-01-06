import { NextApiResponse } from "next";
import { isEmpty } from "lodash";
import nextConnect from "next-connect";
import prisma from "../../../prisma/prisma";
import { authorization } from "../middlewares";

import { NextApiRequestAuthorized } from "../../../shared/shared.interface";

const GetCurrentUser = nextConnect({
  onError(error, req: NextApiRequestAuthorized, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequestAuthorized, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

GetCurrentUser.get(
  async (req: NextApiRequestAuthorized, res: NextApiResponse) => {
    const user = await prisma.users.findUnique({
      where: {
        id: req.decoded.id,
      },
    });

    if (!isEmpty(user)) {
      return res.status(200).send(user);
    } else {
      return res.status(200).send({
        message: "Can't find the user.",
      });
    }
  }
);

export default authorization(GetCurrentUser);
