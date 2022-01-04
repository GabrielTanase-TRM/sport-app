import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../prisma/prisma";

import { authorization } from "../../middlewares";
import { NextApiRequestAuthorized } from "../../../../shared/shared.interface";

const UploadAvatar = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

UploadAvatar.post(
  async (req: NextApiRequestAuthorized, res: NextApiResponse) => {
    await prisma.users
      .update({
        where: { id: req.decoded.id },
        data: {
          avatar: req.body.avatarURL,
        },
      })
      .then((response) => {
        return res.status(200).json({
          user: response,
          message: "Avatar upload successfully.",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  }
);

export default authorization(UploadAvatar);
