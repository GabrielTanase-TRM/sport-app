import React, { MouseEventHandler, MouseEvent } from "react";

interface Button {
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const Button: React.FC<Button> = ({ disabled, onClick, label }) => {
  return (
    <button
      disabled={disabled}
      className={`bg-turquoise disabled:bg-gray-400 text-xs text-white p-2 rounded-md ${
        !disabled && "hover:scale-105 cursor-pointer"
      } transition-all`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
