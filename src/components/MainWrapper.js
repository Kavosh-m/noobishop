import React, { useLayoutEffect, useState } from "react";
// import { app } from "../firebase";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logo } from "../constants/index";
import BasketIcon from "../components/icons/BasketIcon";
import { useNavigate } from "react-router-dom";

// const auth = getAuth();

export default function MainWrapper({ children }) {
  // const auth = getAuth();

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
    <div className="mx-0 flex flex-col justify-between min-h-screen font-poppins">
      <nav
        className={`${
          scrollPosition >= 186 && "sticky top-0"
        } shadow-md bg-white flex items-center justify-between px-28 py-6 mx-0 text-base z-20`}
      >
        <button onClick={() => navigate("/")}>
          <div className="w-36 h-14 flex items-center justify-center">
            <img src={logo} alt="" />
          </div>
        </button>
        <div className="flex items-center justify-center space-x-10">
          <button
            onClick={() => navigate("/")}
            className="hover:text-red-400 transition ease-in-out duration-300"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="hover:text-red-400 transition ease-in-out duration-300"
          >
            Shop
          </button>
          <button
            onClick={() => navigate("/about")}
            className="hover:text-red-400 transition ease-in-out duration-300"
          >
            About
          </button>
          <button className="hover:text-red-400 transition ease-in-out duration-300">
            Contact
          </button>
        </div>
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-3 justify-center">
            {!auth.currentUser ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-red-400 transition ease-in-out duration-300"
                >
                  Login
                </button>
                <p className="font-thin">|</p>
                <button
                  onClick={() => navigate("/register")}
                  className="hover:text-red-400 transition ease-in-out duration-300"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <p>{auth.currentUser.phoneNumber}</p>
                <button
                  className="bg-blue-500 rounded-lg text-white text-sm p-3 py-2 hover:bg-blue-300"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </>
            )}
          </div>
          <button>
            <BasketIcon />
          </button>
        </div>
      </nav>
      <div className="flex-grow">{children}</div>
      <footer className="w-full flex flex-col bg-amber-200">
        <div className="grid grid-cols-5 gap-1 px-24 py-24 bg-gray-900 text-gray-300">
          <div className=" flex flex-col">
            <button onClick={() => navigate("/")} className="w-9/12 mb-4">
              <img src={logo} alt="" />
            </button>
            <p className="text-left w-4/5">
              Noobishop is the best parts shop of your daily nutritions. What
              kind of nutrition do you need you can get here soluta nobis
            </p>
          </div>
          <div className="flex flex-col">
            <p className="underline underline-offset-2 decoration-2 mb-6 text-white text-lg">
              Information
            </p>
            <ul className="space-y-2">
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Our company
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Contact us
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Our services
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Why us?
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Careers
                </button>
              </li>
            </ul>
          </div>
          <div className=" flex flex-col">
            <p className="underline underline-offset-2 decoration-2 mb-6 text-white text-lg">
              Quicklink
            </p>
            <ul className="space-y-2">
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Our company
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Contact us
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Our services
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Why us?
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Careers
                </button>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p className="underline underline-offset-2 decoration-2 mb-6 text-white text-lg">
              Support
            </p>
            <ul className="space-y-2">
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Our company
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Contact us
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Our services
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Why us?
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Careers
                </button>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p className="underline underline-offset-2 decoration-2 mb-6 text-white text-lg">
              See Information
            </p>
            <ul className="space-y-2">
              <li>
                <button className="text-left translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Our company is a great company ever
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Contact us
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Our services
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Why us?
                </button>
              </li>
              <li>
                <button className="translate-x-0 hover:text-red-400 hover:translate-x-2 transition-all ease-in-out duration-300">
                  Careers
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center py-4 bg-black">
          <p className="text-white font-normal">
            Copyright © 2020 KMG | Built with React by Kavosh
          </p>
        </div>
      </footer>
    </div>
  );
}
