import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import foodReg from "../assets/videos/foodRegister.mp4";

const RegisterRoute = () => {
  const [Name, setName] = useState({ content: "", empty: false });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState({
    content: "",
    empty: false,
    wrongFormat: false,
  });
  const [final, setFinal] = useState();
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Handle input errors
    if (Name.content.length === 0) {
      setName({ ...Name, empty: true });
    } else {
      setName({ ...Name, empty: false });
    }

    if (phone.content.length !== 10) {
      setPhone({ ...phone, wrongFormat: true });
    } else {
      setPhone({ ...phone, wrongFormat: false });
    }
    //////////////////////////////////////////////////////////

    // Main task for handling register operation
    if (Name.content.length > 0 && phone.content.length === 10) {
      let verify = new RecaptchaVerifier("recaptcha-container", {}, auth);
      signInWithPhoneNumber(auth, "+98" + phone.content, verify)
        .then((result) => {
          setFinal(result);
          alert("code sent successfully");
          setShow(true);
        })
        .catch((err) => {
          alert(err);
          window.location.reload();
        });
    }
    //////////////////////////////////////////////////////////
  };

  const handleOtp = (e) => {
    e.preventDefault();
    if (otp === "" || final === null) return;
    final
      .confirm(otp)
      .then(async (result) => {
        // console.log("user loged-in succesfully ===> ", result.user.uid);

        await setDoc(doc(db, "users", result.user.uid), {
          name: Name.content,
          email: email,
          phonenumber: "+98" + phone.content,
        });

        navigate("/");
      })
      .catch((err) => {
        console.log("Wrong code, error ===>", err);
      });
  };

  return (
    <div className="font-oswald relative grid min-h-screen w-screen place-items-center tracking-tight">
      <video
        className="absolute -z-10 h-full w-full object-fill opacity-30"
        src={foodReg}
        autoPlay
        muted
        loop
        controls={false}
      />
      {!show ? (
        <div className="flex flex-col items-center space-y-14 bg-[#f3f3f3] px-10 py-9">
          <span className="flex flex-col items-center px-6">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Create Account
            </h1>
            <p>Please Register using account detail bellow</p>
          </span>
          <form className="flex w-full flex-col space-y-6">
            <input
              value={Name.content}
              onChange={(e) => setName({ ...Name, content: e.target.value })}
              type="text"
              required
              placeholder="Full Name..."
              className={`p-3 ${
                Name.empty
                  ? "ring-2 ring-red-500 focus:outline-0"
                  : "focus:border-[1px] focus:border-[#e98c81] focus:outline-0"
              } `}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email..."
              className="p-3 outline-0 focus:border-[1px] focus:border-[#e98c81]"
            />
            <input
              value={phone.content}
              onChange={(e) => setPhone({ ...phone, content: e.target.value })}
              type="tel"
              required
              maxLength={10}
              minLength={10}
              placeholder="Phone (e.g. 9117778888)"
              className={`p-3 ${
                phone.wrongFormat
                  ? "ring-2 ring-red-500 focus:outline-0"
                  : "focus:border-[1px] focus:border-[#e98c81] focus:outline-0"
              } `}
            />

            <button
              type="submit"
              onClick={handleRegister}
              className="w-1/3 rounded-3xl bg-[#e98c81] py-2 px-6 text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
            >
              Register
            </button>
          </form>
          <div id="recaptcha-container"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-14 bg-[#f3f3f3] px-10 py-9">
          <span className="flex flex-col items-center px-6">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Confirm Phonenumber
            </h1>
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
              onClick={handleOtp}
              className="w-1/2 rounded-3xl bg-[#e98c81] py-2 px-6 text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
            >
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterRoute;
