import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import CustomAlert from "../components/CustomAlert";
import { useDispatch } from "react-redux";
import { saveToWishlist } from "../redux/app/slices/wishSlice";

const QuickViewItem = ({
  data,
  handleIncrement,
  handleDecrement,
  handleAddToCart,
  num,
  setIsDialogOpen,
  openToast,
  setOpenToast,
}) => {
  const dispatch = useDispatch();

  const [openToastWishlist, setOpenToastWishlist] = useState(false);

  return (
    <div className="relative z-10 flex w-4/6 items-center justify-between space-x-10 rounded-lg bg-white p-3">
      <div className="aspect-square w-full basis-1/2 bg-lime-300">
        <img className="h-full w-full object-fill" src={data.picurl} alt="" />
      </div>
      <div className="flex h-[450px] basis-1/2 flex-col justify-between bg-white pb-16">
        <div className="flex flex-col space-y-1">
          <p className="text-2xl">{data.name}</p>
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
        <div className="font-poppins flex items-center space-x-2">
          <div className="flex items-center text-sm">
            <button
              onClick={handleDecrement}
              className="border border-gray-300 p-3 px-4 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
            >
              -
            </button>
            <div className="grid w-14 place-items-center border border-r-0 border-l-0 border-gray-300 py-3">
              <p>{num}</p>
            </div>
            <button
              onClick={handleIncrement}
              className="border border-gray-300 p-3 px-4 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="rounded-3xl bg-red-400 p-3 px-4 text-sm text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black disabled:bg-gray-300 disabled:text-black/30"
          >
            ADD TO CART
          </button>
          <button
            onClick={() => {
              dispatch(saveToWishlist(data));
              setOpenToastWishlist(true);
            }}
            className="whitespace-nowrap rounded-3xl border border-gray-400 bg-white p-3 px-4 text-sm text-black transition duration-300 ease-in-out hover:border-red-300 hover:text-red-300"
          >
            Add to wishlist
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsDialogOpen(false)}
        className="absolute top-1 right-3 text-2xl transition-colors duration-300 ease-in-out hover:text-red-300"
      >
        X
      </button>
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

export default QuickViewItem;
