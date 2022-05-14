import React, { forwardRef, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/images/food.jpg";
import { ImSpinner9 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import Navbar from "../components/Navbar";

const usersRef = collection(db, "users");

const provider = new GoogleAuthProvider();

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginRoute() {
  auth.languageCode = "en";

  const [phonenumber, setPhonenumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country3LetterName, setCountry3LetterName] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [final, setFinal] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmloading, setConfirmLoading] = useState(false);
  const [googleVerifier, setGoogleVerifier] = useState("hidden");
  const [error, setError] = useState({ state: false, message: "" });
  const [networkError, setNetworkError] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openToast2, setOpenToast2] = useState(false);

  const navigate = useNavigate();

  //Get country code
  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        // console.log("data Country ====> ", data);
        setCountryCode(data.country_calling_code);
        setCountry3LetterName(data.country_code_iso3);
      })
      .catch((error) => {
        console.log("Country code error =====> ", error);
      });
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  const handleGoogleSignIn = (e) => {
    e.preventDefault();

    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        console.log(
          `User successfully signed-in with google account.\nUser object:\n${user}`
        );
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          `**********\nGoogle Sign-in Error:\nError code: ${errorCode}\nError message: ${errorMessage}\n***********`
        );
        setLoading(false);
      });
  };

  // Sent OTP
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (phonenumber.length !== 10) {
      phonenumber.length === 0
        ? setError({ ...error, state: true, message: "required *" })
        : setError({ ...error, state: true, message: "Invalid input" });

      return;
    }

    setError({ ...error, state: false, message: "" });

    setLoading(true);

    const q = query(usersRef, where("phonenumber", "==", phonenumber));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setGoogleVerifier("block");
      let verify = new RecaptchaVerifier("recaptcha-container", {}, auth);
      signInWithPhoneNumber(auth, countryCode + phonenumber, verify)
        .then((result) => {
          setFinal(result);
          setLoading(false);
          setShow(true);
          setOpenToast(true);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          // window.location.reload();
        });
    } else {
      // console.log("User not found! please register");
      setOpenToast2(true);
      setLoading(false);
    }
  };

  // Validate OTP
  const handleValidateOtp = (e) => {
    e.preventDefault();

    if (otp === null || final === null || otp.length === 0) {
      if (otp.length === 0)
        setError({ ...error, state: true, message: "required *" });

      return;
    }

    setError({ ...error, state: false, message: "" });
    setNetworkError(false);

    setConfirmLoading(true);
    final
      .confirm(otp)
      .then((result) => {
        setConfirmLoading(false);
        // console.log("user loged-in succesfully ===> ", result);
        navigate("/");
      })
      .catch((err) => {
        console.log("Wrong code, error ===>", err);
        if (err.code === "auth/invalid-verification-code") {
          setError({ ...error, state: true, message: "Invalid code" });
        }
        if (err.code === "auth/network-request-failed") {
          setNetworkError(true);
        }

        setConfirmLoading(false);
      });
  };

  return (
    <div className="font-poppins relative flex min-h-screen w-screen items-center justify-center">
      {/* <Navbar /> */}
      {networkError && (
        <p className="fixed top-0 right-0 left-0 bg-red-400 py-3 text-center text-sm text-white">
          network request failed. check your connection!
        </p>
      )}
      <img
        className="absolute -z-10 h-full w-full object-fill opacity-30"
        src={loginBg}
        // autoPlay
        // muted
        // loop
        // controls={false}
      />
      <div className="w-full max-w-6xl bg-indigo-300/0">
        {!show ? (
          <div className="mx-auto flex flex-col items-center space-y-14 bg-gradient-to-bl from-emerald-200 to-sky-200 px-5 py-9 shadow-xl sm:w-[70%] md:w-[65%] md:px-10 lg:w-[55%] lg:px-20">
            <span className="flex flex-col items-center px-6">
              {loading ? (
                <ImSpinner9 className="animate-spin" size={"2rem"} />
              ) : (
                <h1 className="font-oswald text-3xl font-semibold">Login</h1>
              )}
              <p className="mt-3 text-center">
                Please login using a valid phone number
              </p>
            </span>
            <form className="flex w-full flex-col space-y-8">
              <div className="w-full">
                {error.state && (
                  <p className="mb-1 text-sm text-red-500">{error.message}</p>
                )}
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={
                        countryCode !== "+98"
                          ? `https://countryflagsapi.com/png/${country3LetterName}`
                          : `https://countryflagsapi.com/png/IRN`
                      }
                      className="absolute top-0 left-2 z-10 aspect-video w-5 -translate-y-1/2"
                      alt=""
                    />
                    <input
                      className="relative w-[70px] p-3 text-sm focus:outline focus:outline-blue-400"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone..."
                    value={phonenumber}
                    required
                    onChange={(event) => setPhonenumber(event.target.value)}
                    className={`${
                      error.state && "outline outline-2 outline-red-400"
                    } ml-3 w-full p-3 text-sm focus:outline focus:outline-1 focus:outline-red-400`}
                  />
                </div>
              </div>
              {!loading && (
                <button
                  type="submit"
                  onClick={handleSignIn}
                  className="grid w-24 place-items-center rounded-3xl bg-red-400 py-2 text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
                >
                  Send
                </button>
              )}
              <Link
                to="/register"
                className="w-0 whitespace-nowrap transition duration-300 ease-in-out hover:text-red-400"
              >
                Create Account
              </Link>
            </form>

            {/* Google sign-in */}
            <button
              onClick={handleGoogleSignIn}
              className="group flex items-center bg-blue-400 pr-2 shadow-lg transition-colors duration-300 ease-in-out hover:bg-blue-500"
            >
              <div className="bg-white p-3 group-hover:bg-slate-50">
                <FcGoogle />
              </div>
              <p className="font-poppins ml-2 text-xs font-semibold text-white">
                Sign in with Google
              </p>
            </button>

            <div className={googleVerifier} id="recaptcha-container"></div>
            <Snackbar
              open={openToast2}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={6000}
              onClose={() => setOpenToast2(false)}
            >
              <Alert
                onClose={() => setOpenToast2(false)}
                severity="info"
                sx={{ width: "100%" }}
              >
                User not found! please register
              </Alert>
            </Snackbar>
          </div>
        ) : (
          <div className="mx-auto flex w-[90%] flex-col space-y-14 bg-gradient-to-bl from-emerald-200 to-sky-200 px-5 py-9 shadow-xl sm:w-[70%] md:w-[65%] md:px-10 lg:w-[55%] lg:px-20">
            <span className="flex flex-col items-center">
              {confirmloading ? (
                <ImSpinner9 className="animate-spin" size={"2rem"} />
              ) : (
                <h1 className="font-oswald text-center text-3xl font-semibold">
                  Confirmation
                </h1>
              )}
            </span>
            <form className="flex w-full flex-col space-y-8">
              <div className="w-full">
                {error.state && (
                  <p className="mb-1 text-sm text-red-500">{error.message}</p>
                )}
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  type="text"
                  required
                  maxLength={6}
                  minLength={6}
                  placeholder="Enter code..."
                  className={`${
                    error.state && "outline outline-2 outline-red-400"
                  } w-full p-3 text-sm focus:outline focus:outline-1 focus:outline-red-400`}
                />
              </div>

              <button
                type="submit"
                onClick={handleValidateOtp}
                className="w-fit rounded-3xl bg-[#e98c81] px-5 py-2 text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
              >
                Confirm
              </button>
            </form>

            <Snackbar
              open={openToast}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={6000}
              onClose={() => setOpenToast(false)}
              // message="Successfully updated"
              // sx={{
              //   "& .MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation6.MuiSnackbarContent-root":
              //     {
              //       backgroundColor: "green",
              //     },
              // }}
            >
              <Alert
                onClose={() => setOpenToast(false)}
                severity="success"
                sx={{ width: "100%" }}
              >
                Verification code has been sent
              </Alert>
            </Snackbar>
          </div>
        )}
      </div>
    </div>
  );
}
