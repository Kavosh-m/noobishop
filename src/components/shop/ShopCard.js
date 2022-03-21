import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import BasketIcon from "../icons/BasketIcon";
import HeartIconOutlined from "../icons/HeartIconOutlined";
import HeartIcon from "../icons/HeartIcon";
import EyeIcon from "../icons/EyeIcon";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { saveOrders } from "../../redux/app/slices/cartSlice";
import { useSelector } from "react-redux";
import { removeItemFromWishlist } from "../../redux/app/slices/wishSlice";
import { saveToWishlist } from "../../redux/app/slices/wishSlice";

const ShopCard = ({ data, showType }) => {
  const wishlistIDs = useSelector((state) => state.wish.wishlistItemsID);
  const [entered, setEntered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [num, setNum] = useState(0);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    setNum(num + 1);
  };

  const handleDecrement = () => {
    setNum(num > 0 ? num - 1 : 0);
  };

  const handleAddToCart = () => {
    if (num > 0) {
      dispatch(saveOrders({ ...data, count: num }));
    }
  };

  const handleWishlist = (data) => {
    if (wishlistIDs.includes(data.id)) {
      dispatch(removeItemFromWishlist({ id: data.id }));
    } else {
      dispatch(saveToWishlist(data));
    }
  };

  if (showType === "list") {
    return (
      <div className="flex w-full py-5">
        <Link
          className="h-[18rem] basis-4/12 px-7"
          to={{
            pathname: `/products/${data.id}`,
          }}
          state={data}
          // target="_blank"
        >
          <img
            src={data.picurl}
            alt=""
            className="h-full w-full object-contain"
          />
        </Link>
        <div className="basis-[60%] space-y-2 pt-10">
          <Rating name="four star" defaultValue={4.5} precision={0.5} />
          <div>
            <button className="font-oswald text-lg font-semibold transition duration-300 ease-in-out hover:text-red-600">
              {data.name}
            </button>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <p>${(data.price.toFixed(2) * 0.8).toFixed(2)}</p>
            <p className="text-gray-400 line-through">
              ${data.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <button className="hover:text-red-600">
              <BasketIcon />
            </button>
            <button className="hover:text-red-600">
              <HeartIconOutlined />
            </button>
            <button onClick={() => setIsDialogOpen(true)} className="">
              <EyeIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setEntered(true)}
      onMouseLeave={() => setEntered(false)}
      className="w-full transition duration-300 ease-in-out hover:shadow-lg hover:shadow-gray-400"
    >
      <Link
        className="h-[18rem] w-full"
        to={{
          pathname: `/products/${data.id}`,
        }}
        state={data}
        // target="_blank"
      >
        <img
          src={data.picurl}
          className="aspect-square h-full object-fill"
          alt=""
        />
      </Link>
      <div className="space-y-2 py-5 pl-5">
        <Rating name="four star" defaultValue={4.5} precision={0.5} />
        <div>
          <button className="font-oswald text-lg font-semibold transition duration-300 ease-in-out hover:text-red-600">
            {data.name}
          </button>
        </div>
        {!entered ? (
          <div className="flex items-center justify-start space-x-3">
            <p>${(data.price.toFixed(2) * 0.8).toFixed(2)}</p>
            <p className="text-gray-400 line-through">
              ${data.price.toFixed(2)}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-start space-x-3">
            <button
              title="Add to Cart"
              onClick={() => dispatch(saveOrders({ ...data, count: 1 }))}
              className="animate-leftToRight hover:text-red-600"
            >
              <BasketIcon />
            </button>
            <button
              onClick={() => handleWishlist(data)}
              title="Add to Wishlist"
              className="animate-leftToRight animation-delay-200 invisible hover:text-red-600"
            >
              {wishlistIDs?.includes(data.id) ? (
                <HeartIcon />
              ) : (
                <HeartIconOutlined />
              )}
            </button>
            <button
              title="Quick View"
              onClick={() => setIsDialogOpen(true)}
              className="animate-leftToRight animation-delay-600 invisible"
            >
              <EyeIcon />
            </button>
          </div>
        )}
      </div>
      <Transition
        show={isDialogOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Dialog
          className="fixed inset-0 z-30 overflow-y-auto"
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          <div className="flex min-h-screen flex-col items-center justify-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />

            <div className="z-40 flex w-4/6 items-center justify-between space-x-10 rounded-lg bg-white p-3">
              <div className="h-[450px] basis-1/2 bg-lime-300">
                <img
                  className="h-full w-full object-fill"
                  src={data.picurl}
                  alt=""
                />
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
                      <p>{num}</p>
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
                      onClick={handleAddToCart}
                      className="h-full w-full rounded-3xl bg-red-400 p-3 text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ShopCard;
