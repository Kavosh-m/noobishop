import React from "react";
import { ImPhone } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatter } from "../utils/phoneNumberFormatter";

const ProfileHoverCard = ({ auth, signOut, setShowSetting }) => {
  // console.log(auth.currentUser?.providerData[0].photoURL);

  return (
    <div
      onMouseEnter={() => setShowSetting(true)}
      onMouseLeave={() => setShowSetting(false)}
      className="absolute right-0 top-[56px] z-10 flex flex-col divide-y-2 divide-black bg-gradient-to-br from-cyan-200 to-green-300 px-5 py-3 shadow-lg"
    >
      {auth.currentUser?.providerData[0].providerId === "phone" ? (
        <div className="flex items-center p-3">
          <ImPhone />
          <p className="ml-3 whitespace-nowrap">
            {formatter(auth.currentUser.phoneNumber)}
          </p>
        </div>
      ) : auth.currentUser?.providerData[0].providerId === "google.com" ? (
        <div className="flex flex-col items-center p-3">
          <div className="aspect-square w-12 rounded-full">
            <img
              src={auth.currentUser?.providerData[0].photoURL}
              className="h-full w-full rounded-full object-fill"
            />
          </div>
          <p className="font-poppins mt-3 text-xs">
            {auth.currentUser?.providerData[0].email}
          </p>
        </div>
      ) : null}

      <div className="flex items-center p-3">
        <MdSettings />
        <Link
          to="/profile"
          className="ml-3 cursor-pointer whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-red-300"
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
