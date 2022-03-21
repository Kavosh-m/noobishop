import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Sidebar = ({ sidebar, setSidebar }) => {
  //   const [sidebarr, setSidebarr] = useState(sidebar);
  return (
    <div className="animate-fadeInRight fixed top-0 left-0 z-50 flex min-h-screen cursor-pointer">
      <div
        className={`${
          !sidebar ? "animate-fadeOutLeft" : ""
        } cursor-default bg-white`}
      >
        sidebarrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
      </div>
      <div
        onClick={() => setSidebar(false)}
        className="relative w-screen bg-black/40"
      >
        <div
          onClick={() => setSidebar(false)}
          className="absolute grid cursor-pointer place-items-center bg-black p-3"
        >
          <FaPlus
            color="#ffffff"
            size={30}
            className="rotate-45 transition-transform duration-300 ease-in-out hover:-rotate-45"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
