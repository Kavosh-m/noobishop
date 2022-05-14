import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
// import { shopHeader } from "../constants";
import mapboxgl from "mapbox-gl";
import ContactCard from "../components/ContactCard";
import Sidebar from "../components/Sidebar";
import Drawer from "@mui/material/Drawer";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import { useDispatch, useSelector } from "react-redux";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const data = [
  {
    title: "Our Location",
    info: "(800) 123 456 789",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="aspect-square h-4/5 text-red-300 transition-colors delay-200 duration-300 ease-in-out group-hover:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Contact us Anytime",
    info: "Mobile: 012 345 678",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="aspect-square h-4/5 text-red-300 transition-colors delay-200 duration-300 ease-in-out group-hover:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Support Overall",
    info: "Support24/7@ex.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="aspect-square h-4/5 text-red-300 transition-colors delay-200 duration-300 ease-in-out group-hover:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const Contact = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.37);
  const [lat, setLat] = useState(48.83);
  const [zoom, setZoom] = useState(17);

  const sidebarStatus = useSelector((state) => state.util.sidebar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeSidebar());
  }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: false,
    });

    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });
    map.current.addControl(nav, "bottom-right");

    // Create a new marker.
    const marker = new mapboxgl.Marker({ color: "#ff0000" })
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setHTML("<h1>Welcome to Noobishop</h1>"))
      .addTo(map.current);
    marker.togglePopup(); // toggle popup open or closed
  });

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
      <div className="flex flex-1 basis-auto justify-center bg-white">
        <div className="w-full max-w-6xl bg-white">
          {/* Three square */}
          <div className="small:mx-24 mx-4 mt-20 grid grid-cols-2 bg-white">
            <ul className="col-span-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1">
              {data.map((item) => (
                <li
                  key={item.title}
                  className="group flex flex-1 items-center justify-center border border-gray-300 bg-white py-10 md:aspect-square md:py-0 last:md:col-span-2 md:last:aspect-auto last:md:py-10 last:lg:col-span-1 last:lg:py-0"
                >
                  <ContactCard data={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="font-poppins small:mx-24 mx-4 grid grid-cols-1 grid-rows-6 gap-6 md:grid-cols-2">
            <p className="font-oswald col-span-full flex items-end justify-start text-xl font-bold">
              GET IN TOUCH
            </p>
            <input
              className="border border-gray-300 p-3 outline-0 focus:border-red-300"
              placeholder="Name"
              type="text"
            />
            <input
              className="border border-gray-300 p-3 outline-0 focus:border-red-300"
              placeholder="Email"
              type="email"
            />
            <input
              className="col-span-full border border-gray-300 p-3 outline-0 focus:border-red-300"
              placeholder="Subject"
              type="text"
            />
            <textarea
              className="col-span-full row-span-3 border border-gray-300 p-3 outline-0 focus:border-red-300"
              placeholder="Message"
            />
          </div>
          <button className="font-oswald small:ml-24 ml-4 mt-10 w-fit whitespace-nowrap bg-red-400 px-7 py-3 text-center text-lg font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-gray-300 hover:text-black">
            SEND A MESSAGE
          </button>

          {/* Map */}
          <div
            ref={mapContainer}
            className="mt-32 mb-20 h-[560px] bg-cyan-200"
          ></div>
        </div>
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

export default Contact;
