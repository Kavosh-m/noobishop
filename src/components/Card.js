import React, { useState } from "react";
import FireIcon from "./icons/FireIcon";
import HeartIcon from "./icons/HeartIcon";

export default function Card({ data }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="flex h-80 w-64 flex-shrink-0 flex-col items-center justify-between rounded-lg bg-gray-100 shadow-md shadow-gray-400 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-gray-600">
      <div className="flex w-full items-center justify-between px-3 py-3">
        <div className="flex items-center">
          <FireIcon />
          <p className="ml-1 text-xs">{data.calories} calories</p>
        </div>
        <HeartIcon />
      </div>

      <div className="h-44 w-44 rounded-full shadow-lg shadow-gray-500">
        <img
          // onLoad={() => setIsLoaded(true)}
          className="h-full w-full rounded-full object-fill"
          src={data.picurl}
          alt=""
        />
      </div>

      <div className="flex w-full flex-col px-3 pb-3">
        <div className="flex w-full flex-col pb-4">
          <p className="text-base">{data.name}</p>
          <p className="text-sm text-gray-400">{data.extra}</p>
        </div>
        <p className="text-base font-bold">${data.price}</p>
      </div>
    </div>
  );
}
