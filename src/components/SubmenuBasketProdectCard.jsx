import React from "react";
import TrashIcon from "./icons/TrashIcon";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/app/slices/cartSlice";
import { Link } from "react-router-dom";

const SubmenuBasketProdectCard = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className="font-poppins flex w-full items-center justify-between rounded-lg border bg-slate-100 shadow-md">
      <Link
        to={{
          pathname: `/products/${data.id}`,
        }}
        state={data}
        className="aspect-square basis-[30%] cursor-pointer"
      >
        <img src={data.picurl} className="h-full w-full object-fill" />
      </Link>
      <div className="flex basis-[50%] flex-col items-start space-y-2 pl-3">
        <Link
          to={{
            pathname: `/products/${data.id}`,
          }}
          state={data}
          className="cursor-pointer text-left text-sm font-semibold transition-colors duration-300 ease-in-out hover:text-red-500"
        >
          {data.name}
        </Link>
        <div className="text-left">
          {`${data.count}x `}
          <p className="inline text-red-500">${data.price.toFixed(2)}</p>
        </div>
      </div>
      <div
        className="flex basis-[20%] items-center justify-end pr-2"
        onClick={() => dispatch(removeItem({ id: data.id }))}
      >
        <TrashIcon className="h-7 w-7 cursor-pointer transition duration-500 ease-in-out hover:text-red-400" />
      </div>
    </div>
  );
};

export default SubmenuBasketProdectCard;
