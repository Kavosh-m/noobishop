import React from "react";

export default function LoadingIndicator() {
  return (
    <div className="absolute w-40 h-40 rounded-full animate-spin_slow">
      <div className="w-10 h-10 absolute top-0 left-0 rounded-full bg-lime-400 animate-spinbackforth1"></div>
      <div className="w-10 h-10 absolute top-0 right-0 rounded-full bg-red-400 animate-spinbackforth2"></div>
      <div className="w-10 h-10 absolute bottom-0 left-0 rounded-full bg-blue-400 animate-spinbackforth3"></div>
      <div className="w-10 h-10 absolute bottom-0 right-0 rounded-full bg-indigo-400 animate-spinbackforth4"></div>
    </div>
  );
}
