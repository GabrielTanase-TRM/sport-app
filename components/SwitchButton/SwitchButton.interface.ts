import { WidthButton } from "./SwitchButton.enum";

export interface SwitchButtonProps {
  value: boolean;
  onChange: (...args: any) => void;
  widthButton?: WidthButton;
  leftContent: string;
  rightContent: string;
}
