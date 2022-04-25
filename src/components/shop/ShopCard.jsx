import React, { Fragment, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import BasketIcon from "../icons/BasketIcon";
import HeartIconOutlined from "../icons/HeartIconOutlined";
import HeartIcon from "../icons/HeartIcon";
import EyeIcon from "../icons/EyeIcon";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { removeItem, saveOrders } from "../../redux/app/slices/cartSlice";
import { useSelector } from "react-redux";
import { removeItemFromWishlist } from "../../redux/app/slices/wishSlice";
import { saveToWishlist } from "../../redux/app/slices/wishSlice";
import BasketIconSolid from "../icons/BasketIconSolid";
import QuickViewItem from "../QuickViewItem";

const ShopCard = ({ data, showType }) => {
  const wishlistIDs = useSelector((state) => state.wish.wishlistItemsID);
  const cartIDs = useSelector((state) => state.cart.cartItemsID);

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

  const handleCart = (data) => {
    if (cartIDs.includes(data.id)) {
      dispatch(removeItem({ id: data.id }));
    } else {
      dispatch(saveOrders({ ...data, count: 1 }));
    }
  };

  if (showType === "list") {
    return (
      <div className="flex w-full flex-col sm:flex-row">
        <Link
          className="aspect-square w-full p-10 sm:basis-4/12"
          to={{
            pathname: `/products/${data.id}`,
          }}
          state={data}
        >
          <img src={data.picurl} alt="" className="h-full w-full object-fill" />
        </Link>
        <div className="flex flex-col space-y-2 pb-5 pl-10 sm:basis-8/12 sm:py-10 sm:pb-0 sm:pl-0">
          <Rating
            name="four star"
            className="w-0"
            defaultValue={4.5}
            precision={0.5}
            style={{ color: "#E98C81" }}
          />
          <Link
            to={{
              pathname: `/products/${data.id}`,
            }}
            state={data}
            className="font-oswald w-fit whitespace-normal text-lg font-semibold transition duration-300 ease-in-out hover:text-red-600"
          >
            {data.name}
          </Link>
          <div className="flex items-center justify-start space-x-3">
            <p>${(data.price.toFixed(2) * 0.8).toFixed(2)}</p>
            <p className="text-gray-400 line-through">
              ${data.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <button
              title={
                cartIDs?.includes(data.id) ? "Remove from cart" : "Add to cart"
              }
              onClick={() => handleCart(data)}
              className="hover:text-red-600"
            >
              {cartIDs?.includes(data.id) ? (
                <BasketIconSolid />
              ) : (
                <BasketIcon />
              )}
            </button>
            <button
              onClick={() => handleWishlist(data)}
              title={
                wishlistIDs?.includes(data.id)
                  ? "Remove from Wishlist"
                  : "Add to wishlist"
              }
              className="hover:text-red-600"
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
              className=""
            >
              <EyeIcon />
            </button>
          </div>
        </div>
        <Transition show={isDialogOpen} as={Fragment}>
          <Dialog
            className="fixed inset-0 z-40 grid place-items-center"
            onClose={() => setIsDialogOpen(false)}
            as="div"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
            <Transition.Child
              as="div"
              className="grid h-full w-full place-items-center"
              enter="ease-out duration-300"
              enterFrom="opacity-0 -translate-y-12"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 translate-y-12"
            >
              <QuickViewItem
                data={data}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleAddToCart={handleAddToCart}
                num={num}
                setIsDialogOpen={setIsDialogOpen}
              />
            </Transition.Child>
          </Dialog>
        </Transition>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setEntered(true)}
      onMouseLeave={() => setEntered(false)}
      className="relative w-full transition duration-300 ease-in-out hover:shadow-lg hover:shadow-gray-400"
    >
      <Link
        className="aspect-square w-full"
        to={{
          pathname: `/products/${data.id}`,
        }}
        state={data}
      >
        <img
          src={data.picurl}
          className="aspect-square w-full object-fill"
          alt=""
        />
      </Link>
      <div className="space-y-2 py-5 pl-5 pr-4">
        <Rating
          name="four star"
          defaultValue={4.5}
          precision={0.5}
          style={{ color: "#E98C81" }}
        />
        <div>
          <Link
            to={{
              pathname: `/products/${data.id}`,
            }}
            state={data}
            className="font-oswald text-left text-lg font-semibold transition duration-300 ease-in-out hover:text-red-600"
          >
            {data.name}
          </Link>
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
              title={
                cartIDs?.includes(data.id) ? "Remove from cart" : "Add to cart"
              }
              onClick={() => handleCart(data)}
              className="animate-leftToRight hover:text-red-600"
            >
              {cartIDs?.includes(data.id) ? (
                <BasketIconSolid />
              ) : (
                <BasketIcon />
              )}
            </button>
            <button
              onClick={() => handleWishlist(data)}
              title={
                wishlistIDs?.includes(data.id)
                  ? "Remove from Wishlist"
                  : "Add to wishlist"
              }
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
      <Transition show={isDialogOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 z-40 grid place-items-center"
          onClose={() => setIsDialogOpen(false)}
          as="div"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
          <Transition.Child
            as="div"
            className="grid h-full w-full place-items-center"
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-y-12"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 translate-y-12"
          >
            <QuickViewItem
              data={data}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              handleAddToCart={handleAddToCart}
              num={num}
              setIsDialogOpen={setIsDialogOpen}
            />
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ShopCard;
