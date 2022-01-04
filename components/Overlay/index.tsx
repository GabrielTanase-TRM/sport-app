import React from "react";

const Overlay = ({ onClick, opacity }, children) => {
  return (
    <div
      onClick={onClick}
      className={`overlay ${opacity && `bg-opacity-[${opacity * 100}]`} bg-opa`}
    >
      {children}
    </div>
  );
};

export default Overlay;
