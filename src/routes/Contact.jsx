import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { shopHeader } from "../constants";
import mapboxgl from "mapbox-gl";
import ContactCard from "../components/ContactCard";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const data = [
  {
    title: "Our Location",
    info: "(800) 123 456 789",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9 text-red-300 transition-colors delay-200 duration-300 ease-in-out group-hover:text-white"
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
        className="h-9 w-9 text-red-300 transition-colors delay-200 duration-300 ease-in-out group-hover:text-white"
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
    info: "Support24/7@example.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9 text-red-300 transition-colors delay-200 duration-300 ease-in-out group-hover:text-white"
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
  const [zoom, setZoom] = useState(9);

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

  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      <Navbar />
      <div className="h-[375px] w-full bg-gray-300">
        <img
          src={shopHeader}
          alt=""
          className="h-full w-full object-cover brightness-50"
        />
      </div>
      <div className="flex-1 basis-auto bg-white">
        {/* Three square */}
        <div className="mx-24 mt-20 grid grid-cols-2 bg-cyan-200">
          <ul className="col-span-full grid grid-cols-3 gap-6">
            {data.map((item) => (
              <li
                key={item.title}
                className="group grid place-items-center border border-gray-300 bg-white p-10"
              >
                <ContactCard data={item} />
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="font-poppins mx-24 grid grid-cols-2 grid-rows-6 gap-6">
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
        <button className="font-oswald ml-52 mt-10 w-fit whitespace-nowrap bg-red-400 px-7 py-3 text-center text-lg font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-gray-300 hover:text-black">
          SEND A MESSAGE
        </button>

        {/* Map */}
        <div
          ref={mapContainer}
          className="mt-32 mb-20 h-[400px] bg-cyan-200"
        ></div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
