import React, { useEffect, useRef, useState } from "react";
import { shopHeader } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { saveOrders } from "../redux/app/slices/cartSlice";
import { removeItemFromWishlist } from "../redux/app/slices/wishSlice";
import TrashIcon from "../components/icons/TrashIcon";
import Drawer from "@mui/material/Drawer";
import Sidebar from "../components/Sidebar";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

const WishRoute = () => {
  const favorites = useSelector((state) => state.wish.wishlist);
  const dispatch = useDispatch();

  const sidebarStatus = useSelector((state) => state.util.sidebar);

  useEffect(() => {
    dispatch(closeSidebar());
  }, []);

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
    <div ref={mainView} onWheel={handleWheel} className="relative">
      <Navbar />
      <Drawer
        anchor="left"
        open={sidebarStatus}
        onClose={() => dispatch(closeSidebar())}
      >
        <Sidebar />
      </Drawer>
      <div className="h-[375px] w-full bg-gray-300">
        <img
          src={shopHeader}
          alt=""
          className="h-full w-full object-fill brightness-50"
        />
      </div>
      <div className="mx-4 my-10 overflow-x-auto sm:mx-20">
        <table className="font-poppins w-full border-collapse border font-medium">
          <thead>
            <tr className="">
              <th className="border border-gray-400 px-5 py-4">Image</th>
              <th className="border border-gray-400 px-5 py-4">Product</th>
              <th className="border border-gray-400 px-5 py-4">Price</th>
              <th className="whitespace-nowrap border border-gray-400 px-5 py-4">
                Stock Status
              </th>
              <th className="whitespace-nowrap border border-gray-400 px-5 py-4">
                Add To Cart
              </th>
              <th className="border border-gray-400 px-5 py-4">Remove</th>
            </tr>
          </thead>
          <tbody className="">
            {favorites?.map((order) => (
              <tr key={order.id}>
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
                <td className="h-36 min-w-[144px] border border-gray-400 px-5 text-center">
                  <p className="font-bold">In Stock</p>
                </td>
                <td className="h-36 min-w-[202px] border border-gray-400 px-5 text-center">
                  <button
                    // disabled={unit > 0 ? false : true}
                    onClick={() => dispatch(saveOrders({ ...order, count: 1 }))}
                    className="rounded-3xl bg-red-400 p-3 px-7 text-base text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
                  >
                    ADD TO CART
                  </button>
                </td>
                <td className="h-36 min-w-[144px] border border-gray-400 px-5 text-center">
                  <button
                    onClick={() =>
                      dispatch(removeItemFromWishlist({ id: order.id }))
                    }
                    className="flex w-full justify-center"
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default WishRoute;
