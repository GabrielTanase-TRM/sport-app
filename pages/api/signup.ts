import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validation } from "../../shared/regExValidation";
import { hash } from "bcrypt";
import { isEmpty, isNil } from "lodash";
import { schema } from "../../schemas/users";
import { generateHexColor } from "../../shared/utils";

export const Signup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, isTrainer } = req.body;
    const userAlreadyExist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    const validName =
      validation.lettersOnly.test(firstName.trim()) &&
      validation.lettersOnly.test(lastName.trim());
    const validEmail = validation.email.test(email.toLowerCase());
    const validPassword = validation.oneLowerUpperDigit.test(password);
    const validIsTrainer = typeof isTrainer === "boolean";

    if (!isEmpty(userAlreadyExist) || !isNil(userAlreadyExist)) {
      return res.status(409).json({
        message: "Email already exist.",
      });
    }

    if (validName && validEmail && validPassword && validIsTrainer) {
      hash(password, 12, async (err, hash) => {
        if (!err) {
          const userData = {
            firstName,
            lastName,
            email,
            password: hash,
            isTrainer,
            avatar: generateHexColor(),
          };
          schema.parse(userData);
          return await prisma.users
            .create({
              data: userData,
            })
            .then(() => {
              return res.status(201).json({
                message: "User was created.",
              });
            })
            .catch(() => {
              return res.status(401).json({
                message: "Something went wrong, the user can't be created.",
              });
            });
        } else
          return res.status(401).json({
            message: `[BCRYPT]:${err}`,
          });
      });
    } else {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }
  } else {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }
};

export default Signup;
