import React, { useLayoutEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logo } from "../constants/index";
import BasketIcon from "../components/icons/BasketIcon";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MainWrapper({ children }) {
  const orders = useSelector((state) => state.cart.ordered);

  const navigate = useNavigate();

  const [scrollPosition, setPosition] = useState(0);

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
    <div className="font-poppins mx-0 flex min-h-screen flex-col justify-between">
      <nav
        className={`${
          scrollPosition >= 186 && "sticky top-0"
        } z-20 mx-0 flex items-center justify-between bg-white px-28 py-6 text-base shadow-md`}
      >
        <button onClick={() => navigate("/")}>
          <div className="flex h-14 w-36 items-center justify-center">
            <img src={logo} alt="" />
          </div>
        </button>
        <div className="flex items-center justify-center space-x-10">
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
              <>
                <p>{auth.currentUser.phoneNumber}</p>
                <button
                  className="rounded-lg bg-blue-500 p-3 py-2 text-sm text-white hover:bg-blue-300"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </>
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
        </div>
      </nav>
      <div className="flex-grow">{children}</div>
      <footer className="flex w-full flex-col bg-amber-200">
        <div className="grid grid-cols-5 gap-1 bg-gray-900 px-24 py-24 text-gray-300">
          <div className=" flex flex-col">
            <button onClick={() => navigate("/")} className="mb-4 w-9/12">
              <img src={logo} alt="" />
            </button>
            <p className="w-4/5 text-left">
              Noobishop is the best parts shop of your daily nutritions. What
              kind of nutrition do you need you can get here soluta nobis
            </p>
          </div>
          <div className="flex flex-col">
            <p className="mb-6 text-lg text-white underline decoration-2 underline-offset-2">
              Information
            </p>
            <ul className="space-y-2">
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Our company
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Contact us
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Our services
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Why us?
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Careers
                </button>
              </li>
            </ul>
          </div>
          <div className=" flex flex-col">
            <p className="mb-6 text-lg text-white underline decoration-2 underline-offset-2">
              Quicklink
            </p>
            <ul className="space-y-2">
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Our company
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Contact us
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Our services
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Why us?
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Careers
                </button>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p className="mb-6 text-lg text-white underline decoration-2 underline-offset-2">
              Support
            </p>
            <ul className="space-y-2">
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Our company
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Contact us
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Our services
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Why us?
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Careers
                </button>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p className="mb-6 text-lg text-white underline decoration-2 underline-offset-2">
              See Information
            </p>
            <ul className="space-y-2">
              <li>
                <button className="translate-x-0 text-left transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Our company is a great company ever
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Contact us
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Our services
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Why us?
                </button>
              </li>
              <li>
                <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                  Careers
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center bg-black py-4">
          <p className="font-normal text-white">
            Copyright © 2020 KMG | Built with React by Kavosh
          </p>
        </div>
      </footer>
    </div>
  );
}
