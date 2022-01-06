import { User } from "../../shared/shared.interface";

export interface TrainersList {
  trainers: Array<User>;
}

export interface TrainerCard {
  firstName: string;
  lastName: string;
  avatar: string;
}
