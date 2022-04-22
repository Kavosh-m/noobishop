import React from "react";
import { ImPhone } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatter } from "../utils/phoneNumberFormatter";

const ProfileHoverCard = ({ auth, signOut, setShowSetting }) => {
  return (
    <div
      onMouseEnter={() => setShowSetting(true)}
      onMouseLeave={() => setShowSetting(false)}
      className="absolute right-0 top-[54px] z-10 flex flex-col divide-y-2 bg-white px-5 py-3 shadow-lg"
    >
      <div className="flex items-center p-3">
        <ImPhone />
        <p className="ml-3 whitespace-nowrap">
          {formatter(auth.currentUser.phoneNumber)}
        </p>
      </div>

      <div className="flex items-center p-3">
        <MdSettings />
        <Link
          to="/profile"
          className="ml-3 cursor-pointer transition-colors duration-300 ease-in-out hover:text-red-300"
        >
          My Account
        </Link>
      </div>

      <div className="flex items-center p-3">
        <MdLogout />
        <p
          onClick={signOut}
          className="ml-3 cursor-pointer transition-colors duration-300 ease-in-out hover:text-red-300"
        >
          Log Out
        </p>
      </div>
    </div>
  );
};

export default ProfileHoverCard;
