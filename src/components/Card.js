import React from "react";
import FireIcon from "./icons/FireIcon";
import HeartIcon from "./icons/HeartIcon";

export default function Card({ data }) {
  return (
    <div className="bg-gray-100 w-64 h-80 flex flex-col items-center justify-between flex-shrink-0 rounded-lg shadow-md shadow-gray-400 hover:shadow-lg hover:shadow-gray-600 transition-all duration-300 ease-in-out hover:scale-105">
      <div className="w-full flex items-center justify-between px-3 py-3">
        <div className="flex items-center">
          <FireIcon />
          <p className="text-xs ml-1">{data.calories} calories</p>
        </div>
        <HeartIcon />
      </div>

      <div className="w-44 h-44 rounded-full shadow-lg shadow-gray-500">
        <img
          className="object-fill w-full h-full rounded-full"
          src={data.picurl}
          alt=""
        />
      </div>

      <div className="w-full flex flex-col px-3 pb-3">
        <div className="w-full flex flex-col pb-4">
          <p className="text-base">{data.name}</p>
          <p className="text-gray-400 text-sm">{data.extra}</p>
        </div>
        <p className="font-bold text-base">${data.price}</p>
      </div>
    </div>
  );
}
