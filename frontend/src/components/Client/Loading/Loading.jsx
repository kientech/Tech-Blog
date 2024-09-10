import React from "react";

const Loading = ({ borderColor = "gray-200", borderTopColor = "buttonColor" }) => {
  return (
    <div className="flex items-center justify-center h-6">
      <div
        className={`w-6 h-6 border-4 border-t-4 border-${borderColor} border-t-${borderTopColor} rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loading;
