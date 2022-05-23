import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import LottieWrapper from "../components/LottieWrapper";
import lottieNotFound from "../assets/lottie/98642-error-404.json";

const NotFoundRoute = () => {
  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      <div className="flex-1 basis-auto bg-white">
        <div className="mx-auto my-8 flex max-w-6xl flex-col items-center space-y-6 bg-white">
          {/* <h1 className="font-oswald text-center text-6xl font-bold text-red-400 sm:text-9xl">
            404
          </h1> */}
          <LottieWrapper
            jsonData={lottieNotFound}
            className="aspect-square w-2/3 md:w-1/3"
          />
          <h3 className="font-oswald text-center text-xl font-medium sm:text-2xl">
            OPPS! PAGE NOT BE FOUND
          </h3>
          <p className="font-poppins px-4 text-center text-sm font-normal text-slate-600 sm:px-0 sm:text-base">
            Sorry but the page you are looking for does not exist, have been
            removed, name changed or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="font-poppins rounded-[3px] bg-red-400 px-4 py-2 text-center text-xs font-medium uppercase text-white transition-colors duration-300 ease-in-out hover:bg-black"
          >
            back to home page
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundRoute;
