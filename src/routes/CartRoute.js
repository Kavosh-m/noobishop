import React, { useEffect, useState } from "react";
import MainWrapper from "../components/MainWrapper";
import { useSelector, useDispatch } from "react-redux";
import TrashIcon from "../components/icons/TrashIcon";
import { changeNumberOfItem, removeItem } from "../redux/app/slices/cartSlice";
import { shopHeader } from "../constants";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartRoute = () => {
  const orders = useSelector((state) => state.cart.ordered);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = (id) => {
    dispatch(changeNumberOfItem({ id: id, operation: "addition" }));
  };

  const handleDecrement = (id) => {
    dispatch(changeNumberOfItem({ id: id, operation: "subtraction" }));
  };

  const params = {
    merchant_id: process.env.REACT_APP_ZARINPAL_MERCHANT_CODE,
    amount: 10000,
    description: "Payment bill for Noobishop",
    callback_url: "return://zarinpal",
  };

  const zarinpalGate = () => {
    axios({
      url: "https://api.zarinpal.com/pg/v4/payment/request.json",
      method: "POST",
      data: params,
      // headers: {
      //   "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
      //   "Access-Control-Allow-Credentials": "true",
      // },
    })
      .then((response) => {
        const url = `https://www.zarinpal.com/pg/StartPay/Authority=${response.data.data.authority}`;
        // console.log("URL => ", url);
        navigate(url);
      })
      .catch((error) => console.log("error happened ===> ", error));
  };

  return (
    <MainWrapper>
      <div className="h-[375px] w-full bg-gray-300">
        <img
          src={shopHeader}
          alt=""
          className="h-full w-full object-fill brightness-50"
        />
      </div>
      <table className="mx-auto my-10 w-3/4">
        <thead>
          <tr className="mx-auto">
            <th className="border-[1px] border-gray-400 p-3">Image</th>
            <th className="border-[1px] border-gray-400 p-3">Product</th>
            <th className="border-[1px] border-gray-400 p-3">Price</th>
            <th className="border-[1px] border-gray-400 p-3">Quantity</th>
            <th className="border-[1px] border-gray-400 p-3">Total</th>
            <th className="border-[1px] border-gray-400 p-3">Remove</th>
          </tr>
        </thead>
        <tbody className="">
          {orders?.map((order) => (
            <tr key={order.id}>
              <td className="h-36 w-36 border-[1px] border-gray-400 px-4 py-4">
                <img className="h-full w-full object-fill" src={order.picurl} />
              </td>
              <td className="flex h-36 flex-col items-center justify-center border-b-[1px] border-gray-400">
                {order.name}
              </td>
              <td className="h-36 border-[1px] border-gray-400 text-center">
                <p>${order.price}</p>
              </td>
              <td className="h-36 w-64 flex-none border-[1px] border-gray-400 px-5 text-center">
                <div className="flex w-full flex-none flex-row items-center ">
                  <button
                    onClick={() => handleDecrement(order.id)}
                    className="flex-none basis-1/4 border-[1px] border-gray-300 p-3 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    -
                  </button>
                  <div className="flex flex-none basis-1/2 items-center justify-center border-[1px] border-r-0 border-l-0 border-gray-300 p-3">
                    <p>{order.count}</p>
                  </div>
                  <button
                    onClick={() => handleIncrement(order.id)}
                    className="flex-none basis-1/4 border-[1px] border-gray-300 p-3 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="h-36 border-[1px] border-gray-400 text-center">
                ${order.count * order.price}
              </td>
              <td className="h-36 border-[1px] border-gray-400">
                <button
                  onClick={() => dispatch(removeItem({ id: order.id }))}
                  className="flex w-full justify-center"
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mx-auto flex w-3/4 items-center justify-start">
        <div className="flex h-72 basis-1/2 flex-col justify-between bg-gray-100 p-4">
          <p className="text-xl">Cart Totals</p>
          <div className="flex items-center justify-between">
            <p>Total</p>
            <p className="text-green-500">
              {`$${
                orders.length > 0
                  ? orders.reduce(
                      (previousValue, currentValue) =>
                        previousValue + currentValue.price * currentValue.count,
                      0
                    )
                  : 0
              }`}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-3/4">
        <button
          onClick={zarinpalGate}
          className="basis-1/2 bg-red-400 p-3 text-center text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
        >
          PROCEED CHECKOUT
        </button>
      </div>
    </MainWrapper>
  );
};

export default CartRoute;
