import { User } from "../../shared/shared.interface";

export interface ProfileHeaderProps {
  currentUser: User;
  isOwner: boolean;
}

export interface ProfileBodyProps {
  currentUser: User;
  isOwner: boolean;
}
export interface ConfigAvatarModalType {
  display: boolean;
  uploadFunctionality: boolean;
}
