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
