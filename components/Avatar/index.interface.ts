import { ConfigAvatarModalType } from "../Profile/Profile.interface";

export interface AvatarProps {
  avatar: string;
  firstName: string;
  containerClassName?: string;
  editable?: boolean;
  toggleAvatarModal?: (config: ConfigAvatarModalType) => void;
}
