import React from "react";

export default function LoadingIndicator() {
  return (
    <div className="animate-spin_slow absolute h-40 w-40 rounded-full">
      <div className="animate-spinbackforth1 absolute top-0 left-0 h-10 w-10 rounded-full bg-lime-400"></div>
      <div className="animate-spinbackforth2 absolute top-0 right-0 h-10 w-10 rounded-full bg-red-400"></div>
      <div className="animate-spinbackforth3 absolute bottom-0 left-0 h-10 w-10 rounded-full bg-blue-400"></div>
      <div className="animate-spinbackforth4 absolute bottom-0 right-0 h-10 w-10 rounded-full bg-indigo-400"></div>
    </div>
  );
}
