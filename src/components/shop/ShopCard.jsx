import React, { Fragment, useState } from "react";
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
import TrashIcon from "../icons/TrashIcon";
import checkedGif from "../../assets/images/checked2-transparent.gif";

const ShopCard = ({ data, showType }) => {
  const wishlistIDs = useSelector((state) => state.wish.wishlistItemsID);
  const cartIDs = useSelector((state) => state.cart.cartItemsID);
  const orders = useSelector((state) => state.cart.ordered);

  const [entered, setEntered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [num, setNum] = useState(() => {
    let g = orders.filter((item) => item.id === data.id);

    return g.length > 0 ? g[0].count : 1;
  });
  const [openToast, setOpenToast] = useState(false);

  const [showCheckedGif, setShowCheckedGif] = useState(false);

  const dispatch = useDispatch();

  const itemCount = (id) => {
    let g = orders.filter((item) => item.id === id);
    return g[0].count;
  };

  const handleIncrement = () => {
    setNum(num + 1);
  };

  const handleDecrement = () => {
    setNum(num > 1 ? num - 1 : 1);
  };

  const handleAddToCart = () => {
    if (num > 0) {
      dispatch(saveOrders({ ...data, count: num }));
      setOpenToast(true);
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

      setShowCheckedGif(true);

      setTimeout(() => {
        setShowCheckedGif(false);
      }, 1700);
    }
  };

  if (showType === "list") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Link
          className="aspect-square w-full py-10 px-5"
          to={{
            pathname: `/products/${data.id}`,
          }}
          state={data}
        >
          <img src={data.picurl} alt="" className="h-full w-full object-fill" />
        </Link>
        <div className="flex flex-col space-y-2 py-10 pl-5 pr-5 md:pl-0">
          <Link
            to={{
              pathname: `/products/${data.id}`,
            }}
            state={data}
            className="font-oswald w-fit whitespace-normal text-lg font-semibold transition duration-300 ease-in-out hover:text-red-600"
          >
            {data.name}
          </Link>
          <Rating
            size="small"
            name="four star"
            className="w-0"
            defaultValue={4.5}
            precision={0.5}
            style={{ color: "#E98C81" }}
          />

          <div className="flex items-center justify-start space-x-3">
            <p>${(data.price.toFixed(2) * 0.8).toFixed(2)}</p>
            <p className="text-gray-400 line-through">
              ${data.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-start space-x-3 pb-3">
            {cartIDs?.includes(data.id) ? (
              <div className="group relative grid aspect-square w-7 place-items-center rounded-full bg-cyan-600 text-center text-xs text-white hover:bg-white/0">
                <p className="group-hover:hidden">{itemCount(data.id)}</p>
                <TrashIcon
                  onClick={() => dispatch(removeItem({ id: data.id }))}
                  className="hidden h-6 w-6 cursor-pointer text-black transition duration-500 ease-in-out hover:text-red-400 group-hover:block"
                />
              </div>
            ) : (
              <button
                title={
                  cartIDs?.includes(data.id)
                    ? "Remove from cart"
                    : "Add to cart"
                }
                onClick={() => handleCart(data)}
                className="hover:text-red-600"
              >
                {cartIDs?.includes(data.id) ? (
                  <BasketIconSolid />
                ) : (
                  <BasketIcon className="h-6 w-6" />
                )}
              </button>
            )}
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
          <p className="font-poppins border-t pt-3">
            {
              "Burger King is an American multinational chain of hamburger fast food restaurants. Headquartered in Miami-Dade County, Florida, the company was founded in 1953 as Insta-Burger King, a Jacksonville, Florida-based restaurant chain."
            }
          </p>
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
                openToast={openToast}
                setOpenToast={setOpenToast}
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
      className="relative flex w-full flex-col justify-between bg-gray-100 transition duration-300 ease-in-out hover:shadow-lg hover:shadow-gray-400"
    >
      <Link
        className="aspect-video w-full"
        to={{
          pathname: `/products/${data.id}`,
        }}
        state={data}
      >
        <img src={data.picurl} className="h-full w-full object-cover" alt="" />
      </Link>
      <div className="mt-10 flex flex-col space-y-2 pb-5 pt-0 pl-5 pr-4">
        <Link
          to={{
            pathname: `/products/${data.id}`,
          }}
          state={data}
          className="font-oswald text-left text-lg font-semibold transition duration-300 ease-in-out hover:text-red-600"
        >
          {data.name}
        </Link>
        <Rating
          size="small"
          name="four star"
          defaultValue={4.5}
          precision={0.5}
          style={{ color: "#E98C81" }}
        />
        <div className="flex items-center justify-between">
          <div className="">
            ${(data.price.toFixed(2) * 0.8).toFixed(2)}
            <p className="ml-2 inline-block text-gray-400 line-through">
              ${data.price.toFixed(2)}
            </p>
          </div>
          {cartIDs?.includes(data.id) ? (
            <div
              className={`${
                showCheckedGif ? "bg-transparent" : "bg-cyan-600"
              } group relative grid aspect-square w-7 place-items-center rounded-full text-center text-xs text-white hover:bg-white/0`}
            >
              <p className={`${showCheckedGif && "hidden"} group-hover:hidden`}>
                {itemCount(data.id)}
              </p>
              {showCheckedGif && (
                <img src={checkedGif} alt="" className={`absolute inset-0`} />
              )}
              <TrashIcon
                onClick={() => dispatch(removeItem({ id: data.id }))}
                className={`${
                  !showCheckedGif && "group-hover:block"
                } hidden h-6 w-6 cursor-pointer text-black transition duration-500 ease-in-out hover:text-red-400`}
              />
            </div>
          ) : (
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
                <BasketIcon className="h-6 w-6" />
              )}
            </button>
          )}
        </div>

        {entered && (
          <div className="flex items-center justify-start space-x-3">
            <button
              onClick={() => handleWishlist(data)}
              title={
                wishlistIDs?.includes(data.id)
                  ? "Remove from Wishlist"
                  : "Add to wishlist"
              }
              className="animate-leftToRight invisible hover:text-red-600"
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
              className="animate-leftToRight animation-delay-200 invisible"
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
              openToast={openToast}
              setOpenToast={setOpenToast}
            />
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ShopCard;
