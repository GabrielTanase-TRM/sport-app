import React from "react";

const LoadingOverlay = ({ overlay }) => {
  return (
    <div
      className={`fixed inset-0 z-50 ${
        overlay && "bg-overlay"
      } flex items-center justify-center`}
    >
      <p>[Loading placeholder...]</p>
    </div>
  );
};

export default LoadingOverlay;
