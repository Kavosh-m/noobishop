import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TrashIcon from "../components/icons/TrashIcon";
import { changeNumberOfItem, removeItem } from "../redux/app/slices/cartSlice";
import { shopHeader } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Counter from "../components/Counter";
import Sidebar from "../components/Sidebar";
import Drawer from "@mui/material/Drawer";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import ScrollToTopButton from "../components/ScrollToTopButton";

const CartRoute = () => {
  const orders = useSelector((state) => state.cart.ordered);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarStatus = useSelector((state) => state.util.sidebar);

  useEffect(() => {
    dispatch(closeSidebar());
  }, []);

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
        console.log("Zarinpal response ===> ", response.data);
        const url = `https://www.zarinpal.com/pg/StartPay/Authority=${response.data.data.authority}`;
        // console.log("URL => ", url);
        navigate(url);
      })
      .catch((error) => console.log("zarinpal. error happened ===> ", error));
  };

  const mainView = useRef();
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const [wheelUpTimes, setWheelUpTimes] = useState(0);
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setShowBackToTopButton(false);
    } else {
      setShowBackToTopButton(true);
      setWheelUpTimes((prevState) => prevState + 1);
      // console.log(wheelUpTimes);
    }
  };

  return (
    <div ref={mainView} onWheel={handleWheel} className="relative min-h-screen">
      {/* drawer */}
      <Drawer
        anchor="left"
        open={sidebarStatus}
        onClose={() => dispatch(closeSidebar())}
      >
        <Sidebar />
      </Drawer>
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
              <th className="border border-gray-400 px-5 py-4">Image</th>
              <th className="border border-gray-400 px-5 py-4">Product</th>
              <th className="border border-gray-400 px-5 py-4">Price</th>
              <th className="border border-gray-400 px-5 py-4">Quantity</th>
              <th className="border border-gray-400 px-5 py-4">Total</th>
              <th className="border border-gray-400 px-5 py-4">Remove</th>
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
                <td className="h-36 min-w-[200px] border border-gray-400 px-5">
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
        <button
          onClick={zarinpalGate}
          className="w-full bg-red-400 p-3 text-center text-xl font-bold text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
        >
          PROCEED CHECKOUT
        </button>
      </div>
      <Footer />
      <ScrollToTopButton
        showBackToTopButton={showBackToTopButton}
        wheelUpTimes={wheelUpTimes}
        setWheelUpTimes={setWheelUpTimes}
        target={mainView}
      />
    </div>
  );
};

export default CartRoute;
