import React, { useEffect, useState, useRef } from "react";
import { collectionGroup, query, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase";

const AboutRoute = () => {
  const onclick = async () => {
    const foods = query(collectionGroup(db, "items"));
    const querySnapshot = await getDocs(foods);
    console.log("Number of foods ==> ", querySnapshot.size);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      <Navbar />
      <div className="flex-1 basis-auto bg-red-200">
        <p className="bg-cyan-300 p-6">About</p>
        <p className="bg-cyan-300 p-6">About</p>
        <p className="bg-cyan-300 p-6">About</p>
        <p className="bg-cyan-300 p-6">About</p>
        <p className="bg-cyan-300 p-6">About</p>
        <p className="bg-cyan-300 p-6">About</p>
        <p className="bg-cyan-300 p-6">About</p>
        <p className="bg-cyan-300 p-6">About</p>
        <p className="bg-cyan-300 p-6">About</p>
        <p className="bg-cyan-300 p-6">About</p>
        <button
          onClick={onclick}
          className="rounded-3xl bg-indigo-300 p-6 py-3"
        >
          Get
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AboutRoute;
