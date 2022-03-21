import React, { useLayoutEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logo } from "../constants/index";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import BasketIcon from "../components/icons/BasketIcon";
import { useSelector } from "react-redux";

const Navbar = ({ setSidebar }) => {
  const [scrollPosition, setPosition] = useState(0);
  const navigate = useNavigate();
  const orders = useSelector((state) => state.cart.ordered);

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
      .then(() => navigate("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`${
        scrollPosition >= 350 ? "animate-dropDown sticky top-0" : "relative"
      }  z-20 mx-0 flex w-full items-center justify-between bg-white px-12 py-6 text-base shadow-md lg:justify-around lg:px-4`}
    >
      <button onClick={() => navigate("/")}>
        <div className="flex h-14 w-36 items-center justify-center">
          <img src={logo} alt="" />
        </div>
      </button>
      <div className="hidden items-center justify-center space-x-10 lg:flex">
        <button
          onClick={() => navigate("/")}
          className="transition duration-300 ease-in-out hover:text-red-400"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/shop")}
          className="transition duration-300 ease-in-out hover:text-red-400"
        >
          Shop
        </button>
        <button
          onClick={() => navigate("/wish")}
          className="transition duration-300 ease-in-out hover:text-red-400"
        >
          Wishlist
        </button>
        <button
          onClick={() => navigate("/about")}
          className="transition duration-300 ease-in-out hover:text-red-400"
        >
          About
        </button>
        <button className="transition duration-300 ease-in-out hover:text-red-400">
          Contact
        </button>
      </div>
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
            <div className="hidden items-center justify-center space-x-2 lg:flex">
              <p>{auth.currentUser.phoneNumber}</p>
              <button
                className="rounded-lg bg-blue-500 p-3 py-2 text-sm text-white hover:bg-blue-300"
                onClick={handleSignOut}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          {orders?.length > 0 && (
            <div className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
              {orders.length}
            </div>
          )}
          <BasketIcon />
        </Link>
        <svg
          onClick={() => setSidebar(true)}
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
