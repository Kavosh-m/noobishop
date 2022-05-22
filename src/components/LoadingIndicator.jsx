import React from "react";
import lottieJson from "../assets/lottie/24064-food-squeeze-with-burger-and-hot-dog.json";
import LottieWrapper from "./LottieWrapper";

export default function LoadingIndicator() {
  return (
    <LottieWrapper jsonData={lottieJson} className="aspect-square w-1/3" />
  );
}
