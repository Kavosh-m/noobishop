import React from "react";
import { Link } from "react-router-dom";
import SubmenuBasketProdectCard from "./SubmenuBasketProdectCard";
import LottieWrapper from "./LottieWrapper";
import lottieEmptyCart from "../assets/lottie/89832-empty-list.json";

const BasketHoverCard = ({ orders, setShow }) => {
  const total = () => {
    return orders.length > 0
      ? orders.reduce((p, c) => p + c.count * c.price, 0).toFixed(2)
      : 0;
  };

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={`${
        orders.length < 1
          ? "bg-white"
          : "bg-gradient-to-br from-cyan-200 to-green-300"
      } absolute -right-12 top-[52px] z-10 flex w-80 flex-col divide-y-2 divide-black px-6 shadow-xl sm:top-[56px] sm:w-96 lg:right-0`}
    >
      {/*onhover content*/}

      {orders.length < 1 ? (
        <>
          <LottieWrapper
            jsonData={lottieEmptyCart}
            className="w-2/3 self-center"
          />
          <p className="font-poppins my-5 self-center text-center text-xl font-bold text-slate-300">
            Cart is empty !
          </p>
        </>
      ) : (
        <div className="my-5 flex max-h-52 flex-col justify-start space-y-3 overflow-y-auto pr-2">
          {orders?.map((order) => (
            <SubmenuBasketProdectCard data={order} key={order.id} />
          ))}
        </div>
      )}

      <div
        className={`${
          orders.length < 1 && "hidden"
        } font-oswald flex items-center justify-between py-3 text-xl font-bold`}
      >
        <p>total:</p>
        <p>${total()}</p>
      </div>
      <div
        className={`${
          orders.length < 1 && "hidden"
        } font-oswald flex items-center justify-center space-x-2 px-5 py-3 font-bold`}
      >
        <Link
          className="basis-1/2 whitespace-nowrap rounded-3xl bg-gradient-to-bl from-rose-500 to-indigo-500 px-4 py-3 text-center text-slate-200 transition-all duration-700 ease-in-out hover:bg-gradient-to-bl hover:from-rose-300 hover:to-indigo-300 hover:text-slate-700 sm:px-7 sm:text-xl"
          to="/cart"
        >
          VIEW CART
        </Link>
        <Link
          className="basis-1/2 rounded-3xl bg-gradient-to-bl from-rose-500 to-indigo-500 px-4 py-3 text-center text-slate-200 transition-all duration-700 ease-in-out hover:bg-gradient-to-bl hover:from-rose-300 hover:to-indigo-300 hover:text-slate-700 sm:px-7 sm:text-xl"
          to="/cart"
        >
          CHECKOUT
        </Link>
      </div>
    </div>
  );
};

export default BasketHoverCard;
