import { IconType } from "react-icons";

export interface NaviIconProps {
  icon: string | IconType;
  size: number | string;
  tooltip?: string;
  iconClassName?: string;
  containerClassName?: string;
  active?: string;
  firstName?: string;
}
