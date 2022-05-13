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
      <div className="flex-1 basis-auto bg-white">
        {[...new Array(30)].map((_, index) => (
          <p key={index} className="font-poppins mt-10 text-xl">
            This page is under development
          </p>
        ))}
        {/* <button
          onClick={() => addCategoryFieldTofoods("pizza")}
          className="bg-red-200 px-10 py-3"
        >
          ACTION
        </button> */}
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
