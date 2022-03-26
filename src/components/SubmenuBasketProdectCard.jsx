import React from "react";
import TrashIcon from "./icons/TrashIcon";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/app/slices/cartSlice";

const SubmenuBasketProdectCard = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between">
      <div className="aspect-square w-[100px] basis-2/5 cursor-pointer">
        <img src={data.picurl} className="h-full w-full object-fill" />
      </div>
      <div className="flex basis-2/5 flex-col items-start space-y-2 pl-3">
        <p className="cursor-pointer text-left transition-colors duration-300 ease-in-out hover:text-red-300">
          {data.name}
        </p>
        <p className="text-left">
          {`${data.count}x `}
          <p className="inline text-red-300">${data.price.toFixed(2)}</p>
        </p>
      </div>
      <div
        className="basis-1/5 pl-7 pt-6"
        onClick={() => dispatch(removeItem({ id: data.id }))}
      >
        <TrashIcon />
      </div>
    </div>
  );
};

export default SubmenuBasketProdectCard;
