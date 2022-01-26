import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import BasketIcon from "../icons/BasketIcon";
import HeartIconOutlined from "../icons/HeartIconOutlined";
import EyeIcon from "../icons/EyeIcon";
import { useNavigate } from "react-router-dom";

const ShopCard = ({ data }) => {
  const [entered, setEntered] = useState(false);

  const navigate = useNavigate();

  const handleNavigateToProductDetailPage = () => {
    navigate(`/products/${data.id}`, { state: data });
  };

  return (
    <div
      // key={data.id}
      onMouseEnter={() => setEntered(true)}
      onMouseLeave={() => setEntered(false)}
      className="w-full hover:shadow-lg hover:shadow-gray-400 transition duration-300 ease-in-out"
    >
      <div className="w-full h-60">
        <button
          onClick={handleNavigateToProductDetailPage}
          className="w-full h-full"
        >
          <img src={data.picurl} className="object-fill w-full h-full" alt="" />
        </button>
      </div>
      <div className="pl-5 py-3 space-y-2">
        <Rating name="four star" defaultValue={4.5} precision={0.5} />
        <div>
          <button className="hover:text-red-600 transition duration-300 ease-in-out text-lg font-oswald font-semibold">
            {data.name}
          </button>
        </div>
        {!entered ? (
          <div className="flex items-center justify-start space-x-3">
            <p>${(data.price.toFixed(2) * 0.8).toFixed(2)}</p>
            <p className="line-through text-gray-400">
              ${data.price.toFixed(2)}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-start space-x-3">
            <button className="hover:text-red-600 animate-leftToRight">
              <BasketIcon />
            </button>
            <button className="hover:text-red-600 animate-fadeInTop2Bottom">
              <HeartIconOutlined />
            </button>
            <button className="animate-fadeInBottom2Top">
              <EyeIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCard;
