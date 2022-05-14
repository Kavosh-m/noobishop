import React, { useEffect, useRef, useState } from "react";
import {
  collectionGroup,
  query,
  getDocs,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { db } from "../firebase";
import Sidebar from "../components/Sidebar";
import Drawer from "@mui/material/Drawer";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import { useSelector, useDispatch } from "react-redux";
import ScrollToTop from "../components/ScrollToTop";

const AboutRoute = () => {
  // const caroImages = [
  //   {
  //     id: "jfjdhfjygg7",
  //     link: caro1,
  //   },
  //   {
  //     id: "eyhfgbsgdbcj77",
  //     link: caro2,
  //   },
  //   {
  //     id: "ppkkmnjuhetf098",
  //     link: caro3,
  //   },
  // ];

  const sidebarStatus = useSelector((state) => state.util.sidebar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeSidebar());
  }, []);

  // useEffect(() => {
  //   let e = document.getElementById("maindiv");
  //   console.log(e.scrollHeight);
  // });

  const onclick = async () => {
    const foods = query(collectionGroup(db, "items"));
    const querySnapshot = await getDocs(foods);
    console.log("Number of foods ==> ", querySnapshot.size);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const addCategoryFieldTofoods = async (categ) => {
    const querySnapshot = await getDocs(
      collection(db, "foods", categ, "items")
    );
    querySnapshot.forEach(async (docc) => {
      // console.log(doc.id, " => ", doc.data());

      await updateDoc(doc(db, "foods", categ, "items", docc.id), {
        category: categ,
      });
    });
    console.log("done!");
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
      id="maindiv"
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
      <div className="flex flex-1 basis-auto justify-center bg-white">
        <div className="max-w-6xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mt-10 h-5 w-5 text-yellow-500 sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-16 lg:w-16"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-poppins mt-4 text-xl">
            This page is under development
          </p>
          {/* <button
          onClick={() => addCategoryFieldTofoods("pizza")}
          className="bg-red-200 px-10 py-3"
        >
          ACTION
        </button> */}
        </div>
      </div>
      <Footer />
      <ScrollToTop />
      {/* <ScrollToTopButton
        showBackToTopButton={showBackToTopButton}
        wheelUpTimes={wheelUpTimes}
        setWheelUpTimes={setWheelUpTimes}
        target={mainView}
      /> */}
    </div>
  );
};

export default AboutRoute;
