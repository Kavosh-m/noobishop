import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ImPhone } from "react-icons/im";
import { HiMail } from "react-icons/hi";
import { GrFacebookOption } from "react-icons/gr";
import { IoLogoTwitter } from "react-icons/io";
import { TiSocialLinkedin } from "react-icons/ti";
import { ImYoutube2 } from "react-icons/im";
import { FaVimeoV } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebar, setSidebar }) => {
  //   const [sidebarr, setSidebarr] = useState(sidebar);

  const activeClassName = "text-red-300";
  const inactiveClassName =
    "hover:text-red-300 transition-colors duration-300 ease-in-out";

  return (
    <div
      className={`font-poppins relative flex min-h-screen w-[300px] cursor-default flex-col justify-between bg-white`}
    >
      {/* search input and button goes here */}
      <div className="flex w-full items-center justify-between bg-gray-200 py-2 px-3">
        <input
          placeholder="Search products..."
          className="basis-5/6 bg-transparent text-sm outline-0"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="grid h-6 w-6 basis-1/6 cursor-pointer place-items-center text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <ul className="mt-10 space-y-4 px-4">
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

      <div className="px-4">My account</div>

      {/* Contact div goes here */}
      <div className="flex w-full flex-col px-4">
        <div className="flex items-center space-x-2">
          <ImPhone />
          <p className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-red-400">
            {"(1245) 555 6218"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <HiMail />
          <p className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-red-400">
            {"info@noobishop.com"}
          </p>
        </div>
        <ul className="flex items-center justify-start space-x-5 py-8">
          <li className="cursor-pointer" title="facebook">
            <GrFacebookOption />
          </li>
          <li className="cursor-pointer" title="twitter">
            <IoLogoTwitter />
          </li>
          <li className="cursor-pointer" title="linkedIn">
            <TiSocialLinkedin />
          </li>
          <li className="cursor-pointer" title="youtube">
            <ImYoutube2 />
          </li>
          <li className="cursor-pointer" title="vimeo">
            <FaVimeoV />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
