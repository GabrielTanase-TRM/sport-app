import React from "react";
import { OverlayProps } from "./index.interface";

const Overlay: React.FC<OverlayProps> = ({
  onClick,
  opacity = 5,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-overlay z-40 absolute inset-0 ${`bg-opacity-[${
        opacity * 100
      }]`}`}
    >
      {children}
    </div>
  );
};

export default Overlay;
