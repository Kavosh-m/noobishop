import React, { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Link } from "react-router-dom";
import loginBg from "../assets/images/food.jpg";
import { ImSpinner9 } from "react-icons/im";

export default function LoginRoute() {
  auth.languageCode = "en";

  const [phonenumber, setPhonenumber] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [final, setFinal] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmloading, setConfirmLoading] = useState(false);
  const [googleVerifier, setGoogleVerifier] = useState("hidden");
  const [error, setError] = useState({ state: false, message: "" });
  const [networkError, setNetworkError] = useState(false);

  // const navigate = useNavigate();

  // Sent OTP
  const handleSignIn = (e) => {
    e.preventDefault();
    if (phonenumber.length !== 10) {
      phonenumber.length === 0
        ? setError({ ...error, state: true, message: "required *" })
        : setError({ ...error, state: true, message: "Invalid input" });

      return;
    }

    setError({ ...error, state: false, message: "" });

    setLoading(true);
    setGoogleVerifier("block");
    let verify = new RecaptchaVerifier("recaptcha-container", {}, auth);
    signInWithPhoneNumber(auth, "+98" + phonenumber, verify)
      .then((result) => {
        setFinal(result);
        console.log("code sent successfully");
        setLoading(false);
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // window.location.reload();
      });
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
        // navigate("/");
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
    <div className="font-poppins relative flex min-h-screen w-screen items-center justify-center tracking-tight">
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
      {!show ? (
        <div className="flex flex-col items-center space-y-14 bg-[#f3f3f3] px-10 py-9">
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
              <input
                type="tel"
                placeholder="Phone (e.g. 9117778888)"
                value={phonenumber}
                required
                onChange={(event) => setPhonenumber(event.target.value)}
                className={`${
                  error.state && "outline outline-2 outline-red-400"
                } w-full p-3 text-sm focus:outline focus:outline-1 focus:outline-red-400`}
              />
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

          <div className={googleVerifier} id="recaptcha-container"></div>
        </div>
      ) : (
        <div className="flex flex-col space-y-14 bg-[#f3f3f3] px-10 py-9">
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
        </div>
      )}
    </div>
  );
}
