import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  Fragment,
} from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { logo } from "../constants/index";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import BasketIcon from "./icons/BasketIcon";
import { useSelector, useDispatch } from "react-redux";
import { openSidebar } from "../redux/app/slices/utilSlice";
import SubmenuBasketProdectCard from "./SubmenuBasketProdectCard";
import { Transition, Dialog } from "@headlessui/react";
import UserIcon from "./icons/UserIcon";
import ProfileHoverCard from "./ProfileHoverCard";
import { gsap } from "gsap";
import emptyCart from "../assets/images/empty-cart.png";
import BasketHoverCard from "./BasketHoverCard";
import Badge from "@mui/material/Badge";

const Navbar = () => {
  const [scrollPosition, setPosition] = useState(0);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [isLogOutDialogOpen, setIsLogOutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const orders = useSelector((state) => state.cart.ordered);

  const dispatch = useDispatch();

  const activeClassName = "text-red-300";
  const inactiveClassName =
    "hover:text-red-300 transition-colors duration-300 ease-in-out";

  useEffect(() => {
    let t =
      orders.length > 0
        ? orders.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.price * currentValue.count,
            0
          )
        : 0;
    setTotal(t);
  }, [orders]);

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

  const numberOfOrdersRef = useRef();

  useLayoutEffect(() => {
    if (orders?.length > 0) {
      gsap.from(numberOfOrdersRef.current, {
        duration: 0.5,
        yPercent: -100,
        opacity: 0,
      });
    }
  }, [orders?.length]);

  return (
    // <div className="flex justify-center bg-white">
    <div
      className={`${
        scrollPosition >= 350 ? "animate-dropDown sticky top-0" : "relative"
      }  font-poppins z-40 mx-auto flex w-full max-w-6xl items-center justify-between bg-white px-4 py-6 text-base`}
    >
      {/* Left section of Navbar */}
      <Link className="aspect-auto w-32" to="/">
        <img src={logo} alt="" className="h-full w-full object-fill" />
      </Link>

      {/* Middle section of Navbar */}
      <ul className="hidden items-center justify-center space-x-10 lg:flex">
        <li className="cursor-pointer">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Home
          </NavLink>
        </li>
        <li className="cursor-pointer">
          <NavLink
            to="/wish"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Wishlist
          </NavLink>
        </li>
        <li className="cursor-pointer">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            About
          </NavLink>
        </li>
        <li className="cursor-pointer">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Right section of Navbar */}
      <div className="flex items-center justify-center space-x-6">
        {/* Login/Register or profile icon */}
        <div className="flex items-center justify-center space-x-3">
          {!auth.currentUser ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden transition duration-300 ease-in-out hover:text-red-400 sm:block"
              >
                Login
              </button>
              <p className="hidden font-thin sm:block">|</p>
              <button
                onClick={() => navigate("/register")}
                className="hidden transition duration-300 ease-in-out hover:text-red-400 sm:block"
              >
                Register
              </button>
            </>
          ) : (
            <div className="relative z-20 hidden lg:block">
              <Link
                onMouseEnter={() => setShowSetting(true)}
                onMouseLeave={() => setShowSetting(false)}
                to="/profile"
                className="relative"
              >
                <UserIcon />
              </Link>

              <Transition
                show={showSetting}
                enter="transition-all duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-1000"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ProfileHoverCard
                  auth={auth}
                  signOut={setIsLogOutDialogOpen}
                  setShowSetting={setShowSetting}
                />
              </Transition>
            </div>
          )}
        </div>

        {/* Basket icon */}
        <div className="relative bg-white">
          <Badge badgeContent={orders.length} color="error">
            <Link
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              to="/cart"
              className="relative"
            >
              <BasketIcon className="h-6 w-6 transition-colors duration-300 ease-in-out hover:text-indigo-500 sm:h-8 sm:w-8" />
            </Link>
          </Badge>
          <Transition
            show={show}
            enter="transition-all duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <BasketHoverCard orders={orders} setShow={setShow} />
          </Transition>
        </div>

        {/* Hamburger menu icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer transition-colors duration-500 ease-in hover:text-red-300 sm:h-8 sm:w-8 lg:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => dispatch(openSidebar())}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>

      {/* Sign-out modal */}
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
                  onClick={handleSignOut}
                  className="text-sm transition-colors duration-300 ease-in-out hover:text-red-400 sm:text-base"
                >
                  Yes
                </button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
    // </div>
  );
};

export default Navbar;
