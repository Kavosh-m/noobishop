import React, { useEffect, useRef, useState } from "react";
import { collectionGroup, query, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { db } from "../firebase";
import Sidebar from "../components/Sidebar";
import Drawer from "@mui/material/Drawer";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import { useSelector, useDispatch } from "react-redux";

const AboutRoute = () => {
  const sidebarStatus = useSelector((state) => state.util.sidebar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeSidebar());
  }, []);

  const onclick = async () => {
    const foods = query(collectionGroup(db, "items"));
    const querySnapshot = await getDocs(foods);
    console.log("Number of foods ==> ", querySnapshot.size);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const mainView = useRef();
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const [wheelUpTimes, setWheelUpTimes] = useState(0);
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setShowBackToTopButton(false);
    } else {
      setShowBackToTopButton(true);
      setWheelUpTimes((prevState) => prevState + 1);
      // console.log(wheelUpTimes);
    }
  };

  return (
    <div
      ref={mainView}
      onWheel={handleWheel}
      className="relative flex min-h-screen flex-col justify-between"
    >
      {/* drawer */}
      <Drawer
        anchor="left"
        open={sidebarStatus}
        onClose={() => dispatch(closeSidebar())}
      >
        <Sidebar />
      </Drawer>
      <Navbar />
      <div className="flex-1 basis-auto bg-white">
        <p className="font-poppins mt-10 text-xl">
          This page is under development
        </p>
      </div>
      <Footer />
      <ScrollToTopButton
        showBackToTopButton={showBackToTopButton}
        wheelUpTimes={wheelUpTimes}
        setWheelUpTimes={setWheelUpTimes}
        target={mainView}
      />
    </div>
  );
};

export default AboutRoute;
