import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveOrders } from "../redux/app/slices/cartSlice";
import { saveToWishlist } from "../redux/app/slices/wishSlice";
import { shopHeader } from "../constants";
import Rating from "@mui/material/Rating";
import NotFoundRoute from "./NotFoundRoute";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Drawer from "@mui/material/Drawer";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CustomAlert from "../components/CustomAlert";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import creditCards from "../assets/images/img-payment.png";

const ProductDetailsRoute = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const sidebarStatus = useSelector((state) => state.util.sidebar);
  const orders = useSelector((state) => state.cart.ordered);

  const [data, setData] = useState(null);
  const [unit, setUnit] = useState(() => {
    let g = orders.filter((item) => item.id === location.state.id);

    return g.length > 0 ? g[0].count : 1;
  });
  const [openToast, setOpenToast] = useState(false);
  const [openToastWishlist, setOpenToastWishlist] = useState(false);

  const handleIncrement = () => {
    setUnit(unit + 1);
  };

  const handleDecrement = () => {
    setUnit(unit > 1 ? unit - 1 : 1);
  };

  const handleAddToCart = () => {
    if (unit > 0) {
      dispatch(saveOrders({ ...data, count: unit }));
      setOpenToast(true);
    }
  };

  useEffect(() => {
    setData(location.state);
  }, [location]);

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

  if (data === null) {
    return (
      <>
        <NotFoundRoute />
      </>
    );
  }

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

      {/* Header image goes here */}
      <div className="h-[375px] w-full bg-gray-300">
        <img
          src={shopHeader}
          alt=""
          className="h-full w-full object-fill brightness-50"
        />
      </div>

      <div className="mx-10 mt-20 bg-white sm:mx-20">
        <div className="flex flex-col justify-center space-x-0 pb-10 lg:flex-row lg:space-x-3">
          <div className="aspect-square basis-1/2 bg-lime-400">
            <img
              src={data.picurl}
              className="h-full w-full object-fill"
              alt=""
            />
          </div>
          <div className="flex basis-1/2 flex-col justify-between space-y-10 lg:space-y-0">
            <div className="font-poppins flex flex-col space-y-1 pt-10 lg:pt-0">
              <p className="font-oswald text-2xl font-bold">{data.name}</p>
              <div className="flex items-center justify-start space-x-3">
                <p className="text-lg">${(data.price * 0.8).toFixed(2)}</p>
                <p className="text-gray-500 line-through">
                  ${data.price.toFixed(2)}
                </p>
              </div>
              <Rating
                size="small"
                name="four star"
                className="w-0"
                defaultValue={4.5}
                precision={0.5}
                style={{ color: "#E98C81" }}
              />
            </div>

            <div className="font-poppins flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
              <div className="flex items-center text-base font-semibold">
                <button
                  onClick={handleDecrement}
                  className="border border-gray-300 p-3 px-4 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
                >
                  -
                </button>
                <div className="font-oswald grid w-14 place-items-center border border-r-0 border-l-0 border-gray-300 py-3">
                  <p>{unit}</p>
                </div>
                <button
                  onClick={handleIncrement}
                  className="border border-gray-300 p-3 px-4 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
                >
                  +
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="whitespace-nowrap rounded-3xl bg-red-400 p-3 px-4 text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black disabled:bg-gray-300 disabled:text-black/30"
                >
                  ADD TO CART
                </button>

                <button
                  onClick={() => {
                    dispatch(saveToWishlist(data));
                    setOpenToastWishlist(true);
                  }}
                  className="whitespace-nowrap rounded-3xl border-[1px] border-gray-400 bg-white p-3 px-4 text-black transition duration-300 ease-in-out hover:border-red-300 hover:text-red-300"
                >
                  Add to wishlist
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <p className="font-poppins text-base font-semibold">Share :</p>
              <FaFacebookSquare
                size="1.85rem"
                className="cursor-pointer text-blue-800 transition-colors duration-300 ease-in-out hover:text-red-400"
              />
              <FaTwitterSquare
                size="1.85rem"
                className="cursor-pointer text-blue-400 transition-colors duration-300 ease-in-out hover:text-red-400"
              />
              <FaLinkedin
                size="1.85rem"
                className="cursor-pointer text-blue-600 transition-colors duration-300 ease-in-out hover:text-red-400"
              />
              <FaPinterestSquare
                size="1.85rem"
                className="cursor-pointer text-red-600 transition-colors duration-300 ease-in-out hover:text-red-400"
              />
            </div>
            <img
              src={creditCards}
              alt=""
              className="w-3/5 border border-slate-300"
            />
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton
        showBackToTopButton={showBackToTopButton}
        wheelUpTimes={wheelUpTimes}
        setWheelUpTimes={setWheelUpTimes}
        target={mainView}
      />
      <CustomAlert
        alertType="success"
        message="Added to cart"
        isOpen={openToast}
        onClose={() => setOpenToast(false)}
      />
      <CustomAlert
        alertType="success"
        message="Added to wishlist"
        isOpen={openToastWishlist}
        onClose={() => setOpenToastWishlist(false)}
      />
    </div>
  );
};

export default ProductDetailsRoute;
