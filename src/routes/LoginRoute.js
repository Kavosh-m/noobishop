import React, { useState } from "react";
// import { app } from "../firebase";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import foodVideo from "../assets/videos/food.mp4";

export default function LoginRoute() {
  // const auth = getAuth();
  // getAuth().languageCode = "en";
  auth.languageCode = "en";

  // window.recaptchaVerifier = new RecaptchaVerifier(
  //   "recaptcha-container",
  //   {},
  //   auth
  // );

  // useEffect(() => {
  //   let vverify = new RecaptchaVerifier("recaptcha-container", auth);
  // }, []);

  // let vverify = new RecaptchaVerifier("recaptcha-container", {}, auth);

  const [phonenumber, setPhonenumber] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [final, setFinal] = useState("");

  const navigate = useNavigate();

  // Sent OTP
  const handleSignIn = () => {
    if (phonenumber === "" || phonenumber.length < 10) return;

    let verify = new RecaptchaVerifier("recaptcha-container", {}, auth);
    signInWithPhoneNumber(auth, "+98" + phonenumber, verify)
      .then((result) => {
        setFinal(result);
        alert("code sent successfully");
        setShow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const handleValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        // console.log("user loged-in succesfully ===> ", result);
        navigate("/");
      })
      .catch((err) => {
        console.log("Wrong code, error ===>", err);
      });
  };

  return (
    <div className="font-oswald relative flex min-h-screen w-screen items-center justify-center tracking-tight">
      <video
        className="absolute -z-10 h-full w-full object-fill opacity-30"
        src={foodVideo}
        autoPlay
        muted
        loop
        controls={false}
      />
      {!show ? (
        <div className="mx-0 my-24 flex w-[40vw] flex-col items-center justify-between space-y-10 bg-gray-200 px-9 py-7 text-base">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-2xl font-bold">Login</p>
            <p>Please login using a valid phone number</p>
          </div>
          <input
            type="tel"
            placeholder="Phone (e.g. 9117778888)"
            value={phonenumber}
            required
            onChange={(event) => setPhonenumber(event.target.value)}
            className="w-full px-2 py-2 focus:outline focus:outline-1 focus:outline-red-400"
          />
          {/* <input
            type="password"
            placeholder="Enter your password..."
            className="w-full px-2 py-2 focus:outline focus:outline-red-400 focus:outline-1"
          /> */}

          <div className="w-full">
            <button
              onClick={handleSignIn}
              className="w-24 rounded-3xl bg-red-400 py-2 text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
            >
              Send
            </button>
          </div>
          <div className="w-full">
            <Link
              to="/register"
              className="transition duration-300 ease-in-out hover:text-red-400"
            >
              Create Account
            </Link>
          </div>
          <div id="recaptcha-container"></div>
        </div>
      ) : (
        <div className="my-14 py-28">
          <input
            type="text"
            placeholder="Enter code..."
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
          />
          <button onClick={handleValidateOtp}>
            <p>Confirm</p>
          </button>
        </div>
      )}
    </div>
  );
}
