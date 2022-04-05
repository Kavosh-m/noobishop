import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Counter = ({ order, handleIncrement, handleDecrement }) => {
  return (
    <div className="font-poppins flex items-center justify-center font-semibold">
      <button
        onClick={() => handleDecrement(order.id)}
        className="grid basis-1/4 place-items-center border border-gray-300 p-3 font-semibold transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
      >
        <FaMinus />
      </button>
      <div className="basis-1/2 border-t border-b border-gray-300 p-3 py-2 text-center">
        {order.count}
      </div>
      <button
        onClick={() => handleIncrement(order.id)}
        className="grid basis-1/4 place-items-center border border-gray-300 p-3 font-semibold transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Counter;
