import React, { useEffect, useRef, useState } from "react";
import shopHeader from "../assets/images/banner2.jpg";
import { useSelector, useDispatch } from "react-redux";
import { saveOrders } from "../redux/app/slices/cartSlice";
import { removeItemFromWishlist } from "../redux/app/slices/wishSlice";
import TrashIcon from "../components/icons/TrashIcon";
import Drawer from "@mui/material/Drawer";
import Sidebar from "../components/Sidebar";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CustomAlert from "../components/CustomAlert";
import ScrollToTop from "../components/ScrollToTop";
import LottieWrapper from "../components/LottieWrapper";
import lottieEmptyList from "../assets/lottie/92302-spring-joy.json";

const WishRoute = () => {
  const favorites = useSelector((state) => state.wish.wishlist);
  const dispatch = useDispatch();

  const sidebarStatus = useSelector((state) => state.util.sidebar);

  useEffect(() => {
    dispatch(closeSidebar());
  }, [dispatch]);

  const mainView = useRef();
  // const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  // const [wheelUpTimes, setWheelUpTimes] = useState(0);
  const [openToast, setOpenToast] = useState(false);

  // const handleWheel = (e) => {
  //   if (e.deltaY > 0) {
  //     setShowBackToTopButton(false)
  //   } else {
  //     setShowBackToTopButton(true);
  //     setWheelUpTimes((prevState) => prevState + 1);
  //     // console.log(wheelUpTimes);
  //   }
  // };

  return (
    <div
      ref={mainView}
      className="relative flex min-h-screen flex-col justify-between"
    >
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
          className="h-full w-full object-cover brightness-50"
        />
      </div>
      <div className="flex flex-1 basis-auto justify-center bg-white">
        {favorites.length > 0 ? (
          <div className="mx-4 my-10 max-w-6xl overflow-x-auto sm:mx-20">
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
                        alt=""
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
                        onClick={() => {
                          dispatch(saveOrders({ ...order, count: 1 }));
                          setOpenToast(true);
                        }}
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
                        <TrashIcon className="h-9 w-9 cursor-pointer transition duration-500 ease-in-out hover:text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="my-20 flex max-w-6xl flex-col items-center">
            <LottieWrapper jsonData={lottieEmptyList} className="w-1/2" />
            <p className="font-poppins mt-10 text-center text-2xl font-semibold text-slate-400">
              Your wishlist is empty !
            </p>
          </div>
        )}
      </div>
      <Footer />
      <ScrollToTop />
      <CustomAlert
        alertType="success"
        message="Added to cart"
        isOpen={openToast}
        onClose={() => setOpenToast(false)}
      />
    </div>
  );
};

export default WishRoute;
