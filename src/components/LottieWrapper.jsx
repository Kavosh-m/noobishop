import React from "react";
import Lottie from "react-lottie-player";

const LottieWrapper = ({ className, jsonData }) => {
  return <Lottie loop animationData={jsonData} play className={className} />;
};

export default LottieWrapper;
