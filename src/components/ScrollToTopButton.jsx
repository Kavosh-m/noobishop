import React, { useEffect, useLayoutEffect, useState } from "react";

const ScrollToTopButton = ({ target }) => {
  const [scrollPosition, setPosition] = useState(0);
  const [goingDown, setGoingDown] = useState(null);

  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.scrollY);
      //   console.log(window.scrollY - scrollPosition);
      if (window.scrollY - scrollPosition > 0) {
        setGoingDown(true);
        // console.log(goingDown);
      } else {
        setGoingDown(false);
      }
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [window.scrollY]);

  const scrollToRef = (target) => {
    window.scrollTo({
      top: target.current.offsetTop,
      behavior: "smooth",
    });
  };

  const [enter, setEnter] = useState(false);

  const handleMouseEnter = () => {
    setTimeout(() => setEnter(true), 300);
  };

  if (scrollPosition < 200) {
    return null;
  }

  return (
    <div
      onClick={() => scrollToRef(target)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setEnter(false)}
      className={`animate-scrollToTop fixed right-10 bottom-5 grid aspect-square w-14 cursor-pointer place-items-center rounded-full bg-red-400 text-black transition-all duration-700 ease-in-out hover:bg-black`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${enter ? "text-red-400" : "text-white"} h-7 w-7`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default ScrollToTopButton;
