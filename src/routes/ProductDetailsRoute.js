import React, { useEffect, useState } from "react";
import MainWrapper from "../components/MainWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveOrders } from "../redux/app/slices/cartSlice";
import { saveToWishlist } from "../redux/app/slices/wishSlice";
import { shopHeader } from "../constants";
import Rating from "@mui/material/Rating";

const ProductDetailsRoute = () => {
  const navigate = useNavigate();
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

  // useEffect(() => {
  //   saveOrders()
  // }, [dispatch]);

  if (data === null) {
    return (
      <div className="flex h-screen w-screen items-center">Loading...</div>
    );
  }

  return (
    <MainWrapper>
      <div>
        {/* Header image goes here */}
        <div className="h-[375px] w-full bg-gray-300">
          <img
            src={shopHeader}
            alt=""
            className="h-full w-full object-fill brightness-50"
          />
        </div>

        <div className="mx-28 mt-20 bg-white">
          <div className="flex flex-row justify-center space-x-3 pb-10">
            <div className="basis-1/2 bg-lime-400">
              <div className="h-[26rem] w-full">
                <img
                  src={data.picurl}
                  className="h-full w-full object-fill"
                  alt=""
                />
              </div>
            </div>
            <div className="flex basis-1/2 flex-col justify-between">
              <div className="flex flex-col space-y-1">
                <p className="text-2xl">{data.name}</p>
                <div className="flex items-center justify-start space-x-3">
                  <p className="text-lg">${(data.price * 0.8).toFixed(2)}</p>
                  <p className="text-gray-500 line-through">
                    ${data.price.toFixed(2)}
                  </p>
                </div>
                <Rating name="four star" defaultValue={4.5} precision={0.5} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-row items-center">
                  <button
                    onClick={handleDecrement}
                    className="basis-1/4 border-[1px] border-gray-300 p-3 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    -
                  </button>
                  <div className="flex basis-1/2 items-center justify-center border-[1px] border-r-0 border-l-0 border-gray-300 p-3">
                    <p>{unit}</p>
                  </div>
                  <button
                    onClick={handleIncrement}
                    className="basis-1/4 border-[1px] border-gray-300 p-3 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    disabled={unit > 0 ? false : true}
                    onClick={handleAddToCart}
                    className="h-full w-full rounded-3xl bg-red-400 p-3 text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
                  >
                    ADD TO CART
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      dispatch(saveToWishlist(data));
                      // navigate("/wish");
                    }}
                    className="h-full w-full rounded-3xl border-[1px] border-gray-400 bg-white p-3 text-black transition duration-300 ease-in-out hover:border-red-300 hover:text-red-300"
                  >
                    Add to wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default ProductDetailsRoute;
