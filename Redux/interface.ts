import { User } from "../shared/shared.interface";

export interface BadgeNotification {
  id?: number;
  message: string;
  isError?: boolean;
  secondDuration?: number;
}

export interface AppRootStore {
  isLoggedIn: boolean;
  user: User;
  badgeNotifications: Array<BadgeNotification>;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  disabled: boolean;
  isTrainer: boolean;
  deleted: boolean;
  avatar: string;
  testimonials: string;
}
