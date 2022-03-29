import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { logo } from "../constants/index";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import BasketIcon from "../components/icons/BasketIcon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openSidebar } from "../redux/app/slices/utilSlice";
import SubmenuBasketProdectCard from "./SubmenuBasketProdectCard";
import { Transition } from "@headlessui/react";
import UserIcon from "./icons/UserIcon";
import ProfileHoverCard from "./ProfileHoverCard";

const Navbar = () => {
  const [scrollPosition, setPosition] = useState(0);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const navigate = useNavigate();
  const orders = useSelector((state) => state.cart.ordered);

  const dispatch = useDispatch();

  const activeClassName = "text-red-300";
  const inactiveClassName =
    "hover:text-red-300 transition-colors duration-300 ease-in-out";

  useEffect(() => {
    let t =
      orders.length > 0
        ? orders.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.price * currentValue.count,
            0
          )
        : 0;
    setTotal(t);
  }, [orders]);

  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.scrollY);
      // console.log(scrollPosition);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [scrollPosition]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`${
        scrollPosition >= 350 ? "animate-dropDown sticky top-0" : "relative"
      }  font-poppins z-50 mx-0 flex w-full items-center justify-between bg-white px-12 py-6 text-base shadow-md lg:px-4`}
    >
      <button onClick={() => navigate("/")}>
        <div className="flex h-14 w-36 items-center justify-center">
          <img src={logo} alt="" />
        </div>
      </button>
      <ul className="hidden items-center justify-center space-x-10 lg:flex">
        <li className="cursor-pointer">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Home
          </NavLink>
        </li>
        {/* <li className="cursor-pointer">
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Shop
          </NavLink>
        </li> */}
        <li className="cursor-pointer">
          <NavLink
            to="/wish"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Wishlist
          </NavLink>
        </li>
        <li className="cursor-pointer">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            About
          </NavLink>
        </li>
        <li className="cursor-pointer">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center justify-center space-x-3">
          {!auth.currentUser ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="transition duration-300 ease-in-out hover:text-red-400"
              >
                Login
              </button>
              <p className="font-thin">|</p>
              <button
                onClick={() => navigate("/register")}
                className="transition duration-300 ease-in-out hover:text-red-400"
              >
                Register
              </button>
            </>
          ) : (
            <div className="relative z-20 hidden lg:block">
              <Link
                onMouseEnter={() => setShowSetting(true)}
                onMouseLeave={() => setShowSetting(false)}
                to="/profile"
                className="relative"
              >
                <UserIcon />
              </Link>

              <Transition
                show={showSetting}
                enter="transition-all duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-1000"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ProfileHoverCard
                  auth={auth}
                  signOut={handleSignOut}
                  setShowSetting={setShowSetting}
                />
              </Transition>
            </div>
          )}
        </div>

        <div className="relative bg-white">
          <Link
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            to="/cart"
            className="relative"
          >
            {orders?.length > 0 && (
              <div className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {orders.length}
              </div>
            )}
            <BasketIcon />
          </Link>
          <Transition
            show={show}
            enter="transition-all duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              className="absolute right-0 top-[64px] z-10 flex w-80 flex-col divide-y-2 bg-white px-6 shadow-lg"
            >
              {/*onhover content*/}

              <div className="my-5 flex h-80 flex-col justify-start space-y-3 overflow-y-auto pr-2">
                {orders?.map((order) => (
                  <SubmenuBasketProdectCard data={order} key={order.id} />
                ))}
              </div>

              <div className="font-oswald flex items-center justify-between py-3 text-xl font-bold">
                <p>total:</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <div className="font-oswald flex items-center justify-center space-x-2 px-5 py-3 text-xl font-bold">
                <Link
                  className="basis-1/2 rounded-3xl bg-gray-300 px-6 py-2 text-center text-sm text-black transition-all duration-300 ease-in-out hover:bg-red-300 hover:text-white"
                  to="/cart"
                >
                  CART
                </Link>
                <Link
                  className="basis-1/2 rounded-3xl bg-gray-300 px-6 py-2 text-center text-sm text-black transition-all duration-300 ease-in-out hover:bg-red-300 hover:text-white"
                  to="/cart"
                >
                  CHECKOUT
                </Link>
              </div>
            </div>
          </Transition>
        </div>

        <svg
          onClick={() => dispatch(openSidebar())}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer transition-colors duration-500 ease-in hover:text-red-300 lg:hidden"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
