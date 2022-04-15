import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TrashIcon from "../components/icons/TrashIcon";
import { changeNumberOfItem, removeItem } from "../redux/app/slices/cartSlice";
import { shopHeader } from "../constants";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Counter from "../components/Counter";

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
      //   // "Access-Control-Allow-Origin": "*",
      //   // "Access-Control-Allow-Credentials": "true",
      //   // "Access-Control-Request-Method": "POST",
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
    <div className="relative min-h-screen">
      <Navbar />
      <div className="h-[375px] w-full bg-gray-300">
        <img
          src={shopHeader}
          alt=""
          className="h-full w-full object-fill brightness-50"
        />
      </div>
      <div className="mx-4 my-10 overflow-x-auto sm:mx-20">
        <table className="font-poppins w-full border-collapse border font-medium">
          <thead>
            <tr className="">
              <th className="border border-gray-400 py-4">Image</th>
              <th className="border border-gray-400 py-4">Product</th>
              <th className="border border-gray-400 py-4">Price</th>
              <th className="border border-gray-400 py-4">Quantity</th>
              <th className="border border-gray-400 py-4">Total</th>
              <th className="border border-gray-400 py-4">Remove</th>
            </tr>
          </thead>
          <tbody className="">
            {orders?.map((order) => (
              <tr className="" key={order.id}>
                <td className="h-36 w-36 min-w-[144px] border border-gray-400 p-4">
                  <img
                    className="h-full w-full object-fill"
                    src={order.picurl}
                  />
                </td>
                <td className="h-36 min-w-[144px] border border-gray-400 px-5 text-center">
                  {order.name}
                </td>
                <td className="h-36 min-w-[144px] border border-gray-400 px-5 text-center">
                  <p>${order.price}</p>
                </td>
                <td className="h-36 min-w-[144px] border border-gray-400 px-5">
                  <Counter
                    order={order}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                  />
                </td>
                <td className="h-36 min-w-[144px] border border-gray-400 px-5 text-center">
                  <p className="text-center">${order.count * order.price}</p>
                </td>
                <td className="h-36 min-w-[144px] border border-gray-400 px-5 text-center">
                  <button
                    onClick={() => dispatch(removeItem({ id: order.id }))}
                    className=""
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* total price card */}
      <div className="font-oswald mx-4 w-5/6 bg-gray-100 sm:mx-20 sm:w-5/12">
        <p className="p-4 text-lg font-medium text-[#333333]">Cart Totals</p>
        <div className="mt-32 flex items-center justify-between px-5 py-4">
          <p className="text-base font-medium text-[#333333]">Total</p>
          <p className="text-base font-bold text-green-500">
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
        <button className="w-full bg-red-400 p-3 text-center text-xl font-bold text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black">
          PROCEED CHECKOUT
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CartRoute;
