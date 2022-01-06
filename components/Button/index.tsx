import React, { MouseEventHandler } from "react";

interface Button {
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  customButtonClass?: string;
}

const Button: React.FC<Button> = ({
  disabled,
  onClick,
  label,
  customButtonClass,
}) => {
  return (
    <button
      disabled={disabled}
      className={`${customButtonClass} bg-turquoise disabled:bg-gray-400 text-xs text-white p-2 rounded-md font-semibold shadow-md ${
        !disabled && "hover:scale-105 cursor-pointer"
      } transition-all`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
