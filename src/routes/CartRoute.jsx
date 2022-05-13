import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TrashIcon from "../components/icons/TrashIcon";
import { changeNumberOfItem, removeItem } from "../redux/app/slices/cartSlice";
import shopHeader from "../assets/images/banner3.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Counter from "../components/Counter";
import Sidebar from "../components/Sidebar";
import Drawer from "@mui/material/Drawer";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import ScrollToTopButton from "../components/ScrollToTopButton";
import emptyCart from "../assets/images/empty-cart.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CartRoute = () => {
  const orders = useSelector((state) => state.cart.ordered);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [zarinPalLoading, setZarinPalLoading] = useState(false);

  const sidebarStatus = useSelector((state) => state.util.sidebar);

  const totalNumberOfItems = () => {
    let t = orders.reduce((prev, cur) => prev + cur.count, 0);
    return t;
  };

  const totalPrice = () => {
    let t = orders.reduce((prev, cur) => prev + cur.price * cur.count, 0);
    return t;
  };

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
    setZarinPalLoading(true);
    axios({
      url: "https://api.zarinpal.com/pg/v4/payment/request.json",
      method: "POST",
      data: params,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    })
      .then((response) => {
        console.log("Zarinpal response ===> ", response.data);
        const url = `https://www.zarinpal.com/pg/StartPay/Authority=${response.data.data.authority}`;
        // console.log("URL => ", url);
        setZarinPalLoading(false);
        navigate(url);
      })
      .catch((error) => {
        console.log("zarinpal. error happened ===> ", error);
        setZarinPalLoading(false);
      });
  };

  // const zarinpalGate = () => {
  //   fetch(
  //     "https://cors-anywhere.herokuapp.com/https://api.zarinpal.com/pg/v4/payment/request.json",
  //     {
  //       method: "POST",
  //       // headers: {
  //       //   Accept: "application/json",
  //       //   "Content-Type": "application/json",
  //       //   "Access-Control-Allow-Origin": "*",
  //       //   Vary: "Origin",
  //       // },
  //       body: JSON.stringify(params),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // };

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
          className="h-full w-full object-cover brightness-50"
        />
      </div>
      {orders.length > 0 ? (
        <div className="mx-4 my-10 overflow-x-auto sm:mx-20">
          <table className="font-poppins w-full border-collapse border-0 font-medium">
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
                      <TrashIcon className="h-9 w-9 cursor-pointer transition duration-500 ease-in-out hover:text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}

              {/* Last row */}

              <tr className="border border-slate-400 bg-gradient-to-r from-pink-200 to-indigo-200">
                <td className="h-12 min-w-[144px] text-center">Total</td>
                <td></td>
                <td></td>
                <td className="h-12 min-w-[144px] text-center">
                  {totalNumberOfItems()}
                </td>
                <td className="h-12 min-w-[144px] text-center">
                  {`$${totalPrice()}`}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="relative my-20 flex flex-col items-center bg-cyan-400/0">
          <img
            src={emptyCart}
            alt=""
            className="aspect-auto w-1/3 object-cover"
          />
          <p className="font-poppins mt-5 text-2xl font-semibold text-slate-400">
            Your cart is empty !
          </p>
        </div>
      )}

      {/* total price card */}
      {orders.length > 0 && (
        <div className="font-oswald mx-4 mb-16 flex items-center justify-end bg-blue-300/0 sm:mx-20">
          {zarinPalLoading ? (
            <AiOutlineLoading3Quarters
              className="mr-16 animate-spin"
              size="2rem"
            />
          ) : (
            <button
              onClick={zarinpalGate}
              className="bg-red-400 p-3 px-5 text-center font-bold text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
            >
              PROCEED CHECKOUT
            </button>
          )}
        </div>
      )}
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
