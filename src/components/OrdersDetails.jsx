import React from "react";
import emptyCartGif from "../assets/images/empty-cart-gif.gif";
import { Link } from "react-router-dom";

const OrdersDetails = ({ orders }) => {
  const totalPrice = () => {
    return orders.reduce((p, c) => p + c.count * c.price, 0);
  };

  const dateFormatter = () => {
    let time = new Date();
    let n = time.toDateString();

    let dateArray = n.split(" ");

    let month = dateArray[1];
    let day = dateArray[2];
    let year = dateArray[3];

    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="">
      {orders.length < 1 ? (
        <>
          <img
            src={emptyCartGif}
            alt=""
            className="mx-auto aspect-auto w-1/2"
          />
          <p className="font-poppins mx-auto w-4/5 text-center text-lg font-semibold text-slate-400">
            No order!
          </p>
        </>
      ) : (
        <div className="mx-4 my-10 overflow-x-auto">
          <table className="w-full border-collapse border-0">
            <thead>
              <tr className="font-poppins bg-slate-200">
                <th className="border border-gray-400 px-5 py-2">Date</th>
                <th className="border border-gray-400 px-5 py-2">Total</th>
                <th className="border border-gray-400 px-5 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="font-poppins">
                <td className="h-12 min-w-[144px] border border-gray-400 p-4 text-center">
                  {`${dateFormatter()}`}
                </td>
                <td className="h-12 min-w-[144px] border border-gray-400 px-5 text-center">
                  {`$${totalPrice()}`}
                </td>
                <td className="h-12 min-w-[144px] border border-gray-400 px-5 text-center">
                  <Link
                    to="/cart"
                    className="bg-red-400 px-4 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-slate-300 hover:text-black"
                  >
                    View
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersDetails;
