import React, { useState, useRef, useEffect, Fragment } from "react";
// import { shopHeader } from "../constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import AccountDetails from "../components/AccountDetails";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import Drawer from "@mui/material/Drawer";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import axios from "axios";
import { Transition, Dialog } from "@headlessui/react";
import AddressDetails from "../components/AddressDetails";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import OrdersDetails from "../components/OrdersDetails";

const MyAccountRoute = () => {
  const [address, setAddress] = useState("");

  const [tempAddress, setTempAddress] = useState(address);

  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setAddress(tempAddress);

    setLoading(true);
    await updateDoc(doc(db, "users", auth.currentUser?.uid), {
      address: tempAddress,
    });
    setLoading(false);

    setIsAddressDialogOpen(false);
  };

  const onEditAddress = () => {
    setTempAddress(address);
    setIsAddressDialogOpen(true);
  };

  useEffect(() => {
    // step 1 : get address from firestore
    getDoc(doc(db, "users", auth.currentUser?.uid))
      .then((res) => {
        if (res.data().address) {
          setAddress(res.data().address);
        } else {
          axios
            .get("https://ipapi.co/json/")
            .then(async (response) => {
              let data = response.data;

              setAddress(`${data.country_capital}, ${data.country_name}`);
              await updateDoc(doc(db, "users", auth.currentUser?.uid), {
                address: `${data.country_capital}, ${data.country_name}`,
              });
            })
            .catch((error) => {
              console.log("Country code error =====> ", error);
            });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const orders = useSelector((state) => state.cart.ordered);

  const data = [
    {
      title: "ORDERS",
      content: <OrdersDetails orders={orders} />,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      title: "ADDRESS",
      content: (
        <AddressDetails
          address={address}
          setAddress={setAddress}
          tempAddress={tempAddress}
          setTempAddress={setTempAddress}
          loading={loading}
          setLoading={setLoading}
          isAddressDialogOpen={isAddressDialogOpen}
          setIsAddressDialogOpen={setIsAddressDialogOpen}
          onEditAddress={onEditAddress}
          onSave={onSave}
        />
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "ACCOUNT DETAILS",
      content: <AccountDetails />,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "LOGOUT",
      content: null,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
    },
  ];

  const [lever, setLever] = useState(data[0].title);
  const [isLogOutDialogOpen, setIsLogOutDialogOpen] = useState(false);
  // const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const sidebarStatus = useSelector((state) => state.util.sidebar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeSidebar());
  }, []);

  const activeClass =
    "group flex w-full items-center pr-2 space-x-2 border border-red-400 bg-red-400 text-white py-3 pl-3 transition-colors duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white";
  const inactiveClass =
    "group flex w-full items-center pr-2 space-x-2 border bg-white py-3 pl-3 transition-colors duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white";

  const changeLever = (p) => {
    if (p === "LOGOUT") {
      setIsLogOutDialogOpen(true);
    } else {
      setLever(p);
    }
  };

  const handleSigningOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  const contentRef = useRef(null);

  useEffect(() => {
    gsap.from(contentRef.current, { opacity: 0, duration: 0.6 });
  }, [lever]);

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

  // const fetchUserAddressUsingMapbox = (lon, lat) => {
  //   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

  //   axios
  //     .get(url)
  //     .then((response) => console.log("mapbox response ====> ", response))
  //     .catch((error) => console.log("Mapbox error ===> ", error));
  // };

  // const getGeoInfo = () => {
  //   axios
  //     .get("https://ipapi.co/json/")
  //     .then((response) => {
  //       let data = response.data;
  //       console.log("data Country ====> ", data);

  //       setAddress(`${data.country_capital}, ${data.country_name}`);
  //     })
  //     .catch((error) => {
  //       console.log("Country code error =====> ", error);
  //     });
  // };

  // useEffect(() => {
  //   getGeoInfo();
  // }, []);

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
      {/* <div className="h-[375px] w-full bg-gray-300">
        <img
          src={shopHeader}
          alt=""
          className="h-full w-full object-cover brightness-50"
        />
      </div> */}
      <div className="my-20 block flex-1 basis-auto bg-white">
        <div className="mdADetail:px-4 mx-auto grid w-full grid-cols-12 gap-x-8 bg-white px-3 sm:px-20 xl:max-w-[90%] 2xl:max-w-[90%]">
          {/* Item section */}
          <div className="mdADetail:col-span-3 col-span-full flex w-full flex-col items-start">
            {data.map((item) => (
              <button
                key={item.title}
                className={
                  item.title.toLowerCase() === lever.toLowerCase()
                    ? activeClass
                    : inactiveClass
                }
                onClick={() => changeLever(item.title)}
              >
                {item.icon}
                <p className="flex-1 text-left">{item.title}</p>
              </button>
            ))}
          </div>

          {/* Modals -- Address and Logout */}
          <Transition show={isLogOutDialogOpen} as={Fragment}>
            <Dialog
              className="fixed inset-0 z-40 grid place-items-center"
              onClose={() => setIsLogOutDialogOpen(false)}
              as="div"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
              <Transition.Child
                as="div"
                className="grid h-full w-full place-items-center"
                enter="ease-out duration-300"
                enterFrom="opacity-0 -translate-y-12"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0 translate-y-12"
              >
                <div className="font-poppins z-10 flex w-11/12 flex-col space-y-12 bg-white px-4 py-3 sm:w-4/5 md:w-3/5 lg:w-2/5">
                  <p className="whitespace-nowrap text-base font-semibold sm:text-lg">
                    Are you sure you want to sign-out ?
                  </p>
                  <div className="flex items-center justify-end space-x-8">
                    <button
                      onClick={() => setIsLogOutDialogOpen(false)}
                      className="text-sm transition-colors duration-300 ease-in-out hover:text-red-400 sm:text-base"
                    >
                      No
                    </button>
                    <button
                      onClick={handleSigningOut}
                      className="text-sm transition-colors duration-300 ease-in-out hover:text-red-400 sm:text-base"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition>

          {/* Content section */}
          <div
            ref={contentRef}
            className="mdADetail:mt-0 mdADetail:col-span-9 col-span-full mt-8 border p-6"
          >
            <p className="font-oswald border-b pb-2 text-xl font-bold capitalize">
              {lever.toLowerCase()}
            </p>
            {data.filter((item) => item.title === lever)[0].content}
          </div>
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

export default MyAccountRoute;
