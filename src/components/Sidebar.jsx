import React, { useState } from "react";
import { ImPhone } from "react-icons/im";
import { HiMail } from "react-icons/hi";
import { GrFacebookOption } from "react-icons/gr";
import { IoLogoTwitter } from "react-icons/io";
import { TiSocialLinkedin } from "react-icons/ti";
import { ImYoutube2 } from "react-icons/im";
import { FaVimeoV } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const socials = [
  { title: "facebook", icon: <GrFacebookOption /> },
  { title: "twitter", icon: <IoLogoTwitter /> },
  { title: "linkedIn", icon: <TiSocialLinkedin /> },
  { title: "youtube", icon: <ImYoutube2 /> },
  { title: "vimeo", icon: <FaVimeoV /> },
];

const links = [
  { routeName: "Home", path: "/" },
  { routeName: "Wishlist", path: "/wish" },
  { routeName: "About", path: "/about" },
  { routeName: "Contact", path: "/contact" },
  { routeName: "My account", path: "/profile" },
];

const Sidebar = () => {
  const [search, setSearch] = useState("");

  const activeClassName = "text-red-300";
  const inactiveClassName =
    "hover:text-red-300 transition-colors duration-300 ease-in-out";

  return (
    <div className="font-poppins relative flex min-h-screen w-[300px] cursor-default flex-col justify-between bg-white">
      {/* search input and button goes here */}
      <div className="flex h-10 w-full items-center justify-between bg-gray-200 pl-1">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-full basis-5/6 bg-transparent text-sm outline-0"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 basis-1/6 cursor-pointer text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex-1 basis-auto overflow-y-auto bg-white">
        <ul className="mt-10 space-y-4 px-4">
          {links.map((link) => (
            <li key={link.routeName} className="cursor-pointer">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
              >
                {link.routeName}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact div goes here */}
      <div className="mt-4 flex w-full flex-col px-4">
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
          {socials.map((social) => (
            <li
              key={social.title}
              className="cursor-pointer"
              title={social.title}
            >
              {social.icon}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
