import React, { useState } from "react";
// import { app } from "../firebase";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MainWrapper from "../components/MainWrapper";

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
        console.log("user loged-in succesfully");
        navigate("/");
      })
      .catch((err) => {
        console.log("Wrong code, error ===>", err);
      });
  };

  return (
    <MainWrapper>
      <div className="w-full flex items-center justify-center">
        {!show ? (
          <div className="w-[40vw] flex flex-col font-poppins text-sm items-center justify-between bg-gray-200 px-9 py-7 space-y-10 mx-0 my-24">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-xl font-bold">Login</p>
              <p>Please login using a valid phone number</p>
            </div>
            <input
              type="text"
              // pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="Phone (e.g. 9117778888)"
              value={phonenumber}
              onChange={(event) => setPhonenumber(event.target.value)}
              className="w-full px-2 py-2 focus:outline focus:outline-red-400 focus:outline-1"
            />
            {/* <input
            type="password"
            placeholder="Enter your password..."
            className="w-full px-2 py-2 focus:outline focus:outline-red-400 focus:outline-1"
          /> */}
            <div className="w-full">Remember Me</div>
            <div className="w-full">
              <button
                onClick={handleSignIn}
                className="w-24 rounded-3xl py-2 text-white bg-red-400 hover:text-black hover:bg-gray-300 transition duration-300 ease-in-out"
              >
                Send
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() => navigate("/register")}
                className="hover:text-red-400 transition duration-300 ease-in-out"
              >
                Create Account
              </button>
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
    </MainWrapper>
  );
}
