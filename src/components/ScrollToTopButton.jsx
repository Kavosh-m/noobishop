import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ScrollToTopButton = ({ target, showBackToTopButton }) => {
  const [scrollPosition, setPosition] = useState(0);

  const compRef = useRef();

  // console.log(target.current.clientHeight);

  useLayoutEffect(() => {
    if (compRef.current) {
      if (showBackToTopButton) {
        gsap.to(compRef.current, {
          opacity: 1,
          y: 0,
          display: "grid",
          duration: 1,
        });
      } else {
        gsap.to(compRef.current, {
          opacity: 0,
          y: -target.current?.clientHeight / 2,
          display: "none",
          duration: 1,
        });
      }
    }
  }, [showBackToTopButton]);

  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.scrollY);
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

  if (scrollPosition < 200) {
    return null;
  }

  return (
    <div
      ref={compRef}
      onClick={() => scrollToRef(target)}
      className="group fixed right-5 bottom-5 grid aspect-square w-14 cursor-pointer place-items-center rounded-full bg-red-400 text-black transition-colors duration-700 ease-in-out hover:bg-black"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-white transition-colors duration-700 ease-in-out group-hover:text-red-400"
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
