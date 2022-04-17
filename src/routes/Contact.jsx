import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { shopHeader } from "../constants";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

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
        <ul className="font-poppins mx-auto grid w-fit grid-cols-1 gap-8 py-10 text-sm sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1">
          <li className="group grid place-items-center border border-gray-300 bg-white p-10">
            <div>
              <section className="mx-auto w-fit rounded-full border border-red-300 p-3 transition-colors duration-300 ease-in-out group-hover:bg-red-300">
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
              </section>
              <p className="font-oswald py-4 text-center text-lg font-bold">
                Our Location
              </p>
              <p className="text-center">
                (800) 123 456 789 / (800) 123 456 789
              </p>
              <p className="text-center">info@example.com</p>
            </div>
          </li>
          <li className="group grid place-items-center border border-gray-300 bg-white p-10">
            <div>
              <section className="mx-auto w-fit rounded-full border border-red-300 p-3 transition-colors duration-300 ease-in-out group-hover:bg-red-300">
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
              </section>
              <p className="font-oswald py-4 text-center text-lg font-bold">
                Contact us Anytime
              </p>
              <p className="text-center">Mobile: 012 345 678</p>
              <p className="text-center">Fax: 123 456 789</p>
            </div>
          </li>
          <li className="group grid place-items-center border border-gray-300 bg-white p-10 sm:col-span-2 lg:col-span-1">
            <div>
              <section className="mx-auto w-fit rounded-full border border-red-300 p-3 transition-colors duration-300 ease-in-out group-hover:bg-red-300">
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
              </section>
              <p className="font-oswald py-4 text-center text-lg font-bold">
                Support Overall
              </p>
              <p className="text-center">Support24/7@example.com</p>
              <p className="text-center">info@example.com</p>
            </div>
          </li>
        </ul>

        {/* Form */}
        <div className="font-poppins mx-52 grid grid-cols-2 grid-rows-6 gap-6">
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
