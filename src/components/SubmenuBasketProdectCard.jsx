import React from "react";
import TrashIcon from "./icons/TrashIcon";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/app/slices/cartSlice";
import { Link } from "react-router-dom";

const SubmenuBasketProdectCard = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between">
      <Link
        to={{
          pathname: `/products/${data.id}`,
        }}
        state={data}
        className="aspect-square w-[100px] basis-2/5 cursor-pointer"
      >
        <img src={data.picurl} className="h-full w-full object-fill" />
      </Link>
      <div className="flex basis-2/5 flex-col items-start space-y-2 pl-3">
        <Link
          to={{
            pathname: `/products/${data.id}`,
          }}
          state={data}
          className="cursor-pointer text-left transition-colors duration-300 ease-in-out hover:text-red-300"
        >
          {data.name}
        </Link>
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
