import React, { useLayoutEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logo } from "../constants/index";
import BasketIcon from "../components/icons/BasketIcon";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MainWrapper({ children }) {
  const orders = useSelector((state) => state.cart.ordered);

  const navigate = useNavigate();

  const [scrollPosition, setPosition] = useState(0);

  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.scrollY);
      // console.log(scrollPosition);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [scrollPosition]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="font-poppins mx-0 flex min-h-screen w-screen flex-col justify-between">
      {/* Header/Navbar */}

      {/* Main content of the page */}
      <div className="flex-grow">{children}</div>

      {/* Footer */}
    </div>
  );
}
