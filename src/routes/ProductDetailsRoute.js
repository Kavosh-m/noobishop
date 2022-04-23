import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveOrders } from "../redux/app/slices/cartSlice";
import { saveToWishlist } from "../redux/app/slices/wishSlice";
import { shopHeader } from "../constants";
import Rating from "@mui/material/Rating";
import NotFoundRoute from "./NotFoundRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductDetailsRoute = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [unit, setUnit] = useState(0);

  const handleIncrement = () => {
    setUnit(unit + 1);
  };

  const handleDecrement = () => {
    setUnit(unit > 0 ? unit - 1 : 0);
  };

  const handleAddToCart = () => {
    if (unit > 0) {
      dispatch(saveOrders({ ...data, count: unit }));
    }
  };

  useEffect(() => {
    setData(location.state);
  }, [location]);

  if (data === null) {
    return (
      <>
        <NotFoundRoute />
      </>
    );
  }

  return (
    <div className="relative min-h-screen">
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
              <Rating name="four star" defaultValue={4.5} precision={0.5} />
            </div>

            <div className="font-poppins flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
              <div className="flex items-center text-base font-semibold">
                <button
                  onClick={handleDecrement}
                  className="border-[1px] border-gray-300 p-3 px-4 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
                >
                  -
                </button>
                <div className="font-oswald grid w-14 place-items-center border-[1px] border-r-0 border-l-0 border-gray-300 py-3">
                  <p>{unit}</p>
                </div>
                <button
                  onClick={handleIncrement}
                  className="border-[1px] border-gray-300 p-3 px-4 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
                >
                  +
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  disabled={unit > 0 ? false : true}
                  onClick={handleAddToCart}
                  className="whitespace-nowrap rounded-3xl bg-red-400 p-3 px-4 text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
                >
                  ADD TO CART
                </button>

                <button
                  onClick={() => {
                    dispatch(saveToWishlist(data));
                    // navigate("/wish");
                  }}
                  className="whitespace-nowrap rounded-3xl border-[1px] border-gray-400 bg-white p-3 px-4 text-black transition duration-300 ease-in-out hover:border-red-300 hover:text-red-300"
                >
                  Add to wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailsRoute;
