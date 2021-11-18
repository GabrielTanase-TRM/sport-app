import { NextApiRequest } from "next";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  disabled: boolean;
  isTrainer: boolean;
  deleted: boolean;
}

export interface NextApiRequestAuthenticated extends NextApiRequest {
  decoded: User;
}
