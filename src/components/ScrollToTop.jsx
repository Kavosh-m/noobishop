import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // if user scroll 50 percent of the page, button will be visible
    if (window.scrollY > 0.5 * window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  //   if (!isVisible) {
  //     return null;
  //   }

  return (
    <Transition
      appear={true}
      show={isVisible}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        onClick={goToTop}
        className="group fixed bottom-2 right-2 grid aspect-square w-12 cursor-pointer place-items-center rounded-full bg-rose-400 transition-colors duration-500 ease-in-out hover:bg-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white transition-colors duration-1000 ease-in-out group-hover:text-rose-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </Transition>
  );
};

export default ScrollToTop;
