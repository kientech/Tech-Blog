import React from "react";

const Loading = ({ borderColor = "#e5e7eb", borderTopColor = "#ff757a" }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="w-6 h-6 border-4 border-solid rounded-full animate-spin"
        style={{
          borderColor: `${borderColor} transparent`,
          borderTopColor: borderTopColor,
        }}
      ></div>
    </div>
  );
};

export default Loading;
