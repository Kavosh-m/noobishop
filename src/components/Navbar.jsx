import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { logo } from "../constants/index";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import BasketIcon from "./icons/BasketIcon";
import { useSelector, useDispatch } from "react-redux";
import { openSidebar } from "../redux/app/slices/utilSlice";
import SubmenuBasketProdectCard from "./SubmenuBasketProdectCard";
import { Transition } from "@headlessui/react";
import UserIcon from "./icons/UserIcon";
import ProfileHoverCard from "./ProfileHoverCard";
import { gsap } from "gsap";
import emptyCart from "../assets/images/empty-cart.png";
import BasketHoverCard from "./BasketHoverCard";

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

  const numberOfOrdersRef = useRef();

  useLayoutEffect(() => {
    if (orders?.length > 0) {
      gsap.from(numberOfOrdersRef.current, {
        duration: 0.5,
        yPercent: -100,
        opacity: 0,
      });
    }
  }, [orders?.length]);

  return (
    <div
      className={`${
        scrollPosition >= 350 ? "animate-dropDown sticky top-0" : "relative"
      }  font-poppins z-40 mx-0 flex w-full items-center justify-between bg-white px-4 py-6 text-base shadow-md`}
    >
      {/* Left section of Navbar */}
      <Link className="aspect-auto w-32" to="/">
        <img src={logo} alt="" className="h-full w-full object-fill" />
      </Link>

      {/* Middle section of Navbar */}
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

      {/* Right section of Navbar */}
      <div className="flex items-center justify-center space-x-6">
        {/* Login/Register or profile icon */}
        <div className="flex items-center justify-center space-x-3">
          {!auth.currentUser ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden transition duration-300 ease-in-out hover:text-red-400 sm:block"
              >
                Login
              </button>
              <p className="hidden font-thin sm:block">|</p>
              <button
                onClick={() => navigate("/register")}
                className="hidden transition duration-300 ease-in-out hover:text-red-400 sm:block"
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

        {/* Basket icon */}
        <div className="relative bg-white">
          <Link
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            to="/cart"
            className="relative"
          >
            {orders?.length > 0 && (
              <div className="absolute top-0 right-0 flex h-5 w-5 translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                <p ref={numberOfOrdersRef}>{orders.length}</p>
              </div>
            )}
            <BasketIcon className="h-6 w-6 transition-colors duration-300 ease-in-out hover:text-indigo-500 sm:h-8 sm:w-8" />
          </Link>
          <Transition
            show={show}
            enter="transition-all duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <BasketHoverCard orders={orders} setShow={setShow} />
          </Transition>
        </div>

        {/* Hamburger menu icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer transition-colors duration-500 ease-in hover:text-red-300 sm:h-8 sm:w-8 lg:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => dispatch(openSidebar())}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
