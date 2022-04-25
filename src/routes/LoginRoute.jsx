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

  // const navigate = useNavigate();

  // Sent OTP
  const handleSignIn = (e) => {
    e.preventDefault();
    if (phonenumber === "" || phonenumber.length < 10) return;

    setLoading(true);
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
    if (otp === null || final === null) return;
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
        setConfirmLoading(false);
      });
  };

  return (
    <div className="font-oswald relative flex min-h-screen w-screen items-center justify-center tracking-tight">
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
              <h1 className="text-2xl font-semibold tracking-tighter">Login</h1>
            )}
            <p>Please login using a valid phone number</p>
          </span>
          <form className="flex w-full flex-col space-y-6">
            <input
              type="tel"
              placeholder="Phone (e.g. 9117778888)"
              value={phonenumber}
              required
              onChange={(event) => setPhonenumber(event.target.value)}
              className="w-full px-2 py-2 focus:outline focus:outline-1 focus:outline-red-400"
            />
            <button
              type="submit"
              onClick={handleSignIn}
              className="grid w-24 place-items-center rounded-3xl bg-red-400 py-2 text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
            >
              Send
            </button>
            <Link
              to="/register"
              className="w-0 whitespace-nowrap transition duration-300 ease-in-out hover:text-red-400"
            >
              Create Account
            </Link>
          </form>

          <div id="recaptcha-container"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-14 bg-[#f3f3f3] px-10 py-9">
          <span className="flex flex-col items-center px-6">
            {confirmloading ? (
              <ImSpinner9 className="animate-spin" size={"2rem"} />
            ) : (
              <h1 className="text-2xl font-semibold tracking-tighter">
                Confirm Phonenumber
              </h1>
            )}
          </span>
          <form className="flex w-full flex-col space-y-6">
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              required
              maxLength={6}
              minLength={6}
              placeholder="Enter confirmation code..."
              className={`p-3 focus:border-[1px] focus:border-[#e98c81] focus:outline-0`}
            />

            <button
              type="submit"
              onClick={handleValidateOtp}
              className="w-1/2 rounded-3xl bg-[#e98c81] py-2 px-6 text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
            >
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
