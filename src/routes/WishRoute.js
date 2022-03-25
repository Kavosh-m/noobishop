import React, { useEffect } from "react";
import MainWrapper from "../components/MainWrapper";
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

const WishRoute = () => {
  const favorites = useSelector((state) => state.wish.wishlist);
  const dispatch = useDispatch();

  const sidebarStatus = useSelector((state) => state.util.sidebar);

  useEffect(() => {
    dispatch(closeSidebar());
  }, []);

  return (
    <div>
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
      <table className="mx-auto my-10 w-3/4">
        <thead>
          <tr className="mx-auto">
            <th className="border-[1px] border-gray-400 p-3">Image</th>
            <th className="border-[1px] border-gray-400 p-3">Product</th>
            <th className="border-[1px] border-gray-400 p-3">Price</th>
            <th className="border-[1px] border-gray-400 p-3">Stock Status</th>
            <th className="border-[1px] border-gray-400 p-3">Add To Cart</th>
            <th className="border-[1px] border-gray-400 p-3">Remove</th>
          </tr>
        </thead>
        <tbody className="">
          {favorites?.map((order) => (
            <tr key={order.id}>
              <td className="h-36 w-36 border-[1px] border-gray-400 px-4 py-4">
                <img className="h-full w-full object-fill" src={order.picurl} />
              </td>
              <td className="flex h-36 flex-col items-center justify-center border-b-[1px] border-gray-400">
                {order.name}
              </td>
              <td className="h-36 border-[1px] border-gray-400 text-center">
                <p>${order.price}</p>
              </td>
              <td className="h-36 w-64 flex-none border-[1px] border-gray-400 px-5 text-center">
                <p className="font-bold">In Stock</p>
              </td>
              <td className="h-36 border-[1px] border-gray-400 text-center">
                <button
                  // disabled={unit > 0 ? false : true}
                  onClick={() => dispatch(saveOrders({ ...order, count: 1 }))}
                  className=" rounded-3xl bg-red-400 p-3 px-7 text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
                >
                  ADD TO CART
                </button>
              </td>
              <td className="h-36 border-[1px] border-gray-400">
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
      <Footer />
    </div>
  );
};

export default WishRoute;
