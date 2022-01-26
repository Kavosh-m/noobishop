import React, { useEffect, useState } from "react";
import MainWrapper from "../components/MainWrapper";
import { useLocation } from "react-router-dom";
import { shopHeader } from "../constants";
import Rating from "@mui/material/Rating";

const ProductDetailsRoute = () => {
  //   const params = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState(0);

  const handleIncrement = () => {
    setUnit(unit + 1);
  };

  const handleDecrement = () => {
    setUnit(unit > 0 ? unit - 1 : 0);
  };

  useEffect(() => {
    // console.log(location.state);
    setData(location.state);
  }, [location]);

  if (data === null) {
    return (
      <div className="w-screen h-screen flex items-center">Loading...</div>
    );
  }

  return (
    <MainWrapper>
      <div>
        {/* Header image goes here */}
        <div className="w-full h-[375px] bg-gray-300">
          <img
            src={shopHeader}
            alt=""
            className="w-full h-full object-fill brightness-50"
          />
        </div>

        <div className="mt-20 mx-28 bg-white">
          <div className="flex flex-row justify-center pb-10 space-x-3">
            <div className="basis-1/2 bg-lime-400">
              <div className="w-full h-[26rem]">
                <img
                  src={data.picurl}
                  className="object-fill w-full h-full"
                  alt=""
                />
              </div>
            </div>
            <div className="basis-1/2 flex flex-col justify-between">
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
                    className="p-3 basis-1/4 border-[1px] border-gray-300 hover:border-red-400 hover:bg-red-400 hover:text-white transition duration-300 ease-in-out"
                  >
                    -
                  </button>
                  <div className="flex items-center justify-center p-3 basis-1/2 border-[1px] border-r-0 border-l-0 border-gray-300">
                    <p>{unit}</p>
                  </div>
                  <button
                    onClick={handleIncrement}
                    className="p-3 basis-1/4 border-[1px] border-gray-300 hover:border-red-400 hover:bg-red-400 hover:text-white transition duration-300 ease-in-out"
                  >
                    +
                  </button>
                </div>
                <div>
                  <button className="p-3 w-full h-full bg-red-400 rounded-3xl text-white hover:text-black hover:bg-gray-300 transition duration-300 ease-in-out">
                    ADD TO CART
                  </button>
                </div>
                <div>
                  <button className="p-3 w-full h-full border-[1px] border-gray-400 bg-white rounded-3xl text-black hover:text-red-300 hover:border-red-300 transition duration-300 ease-in-out">
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
