import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import registerBg from "../assets/images/foodRegister.jpg";
import { ImSpinner9 } from "react-icons/im";

const usersRef = collection(db, "users");

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
  const [googleVerifier, setGoogleVerifier] = useState("hidden");
  const [loading, setLoading] = useState(false);
  const [confirmloading, setConfirmLoading] = useState(false);
  const [error, setError] = useState({ state: false, message: "" });
  const [networkError, setNetworkError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setName({ ...Name, empty: false });
    setPhone({ ...phone, empty: false, wrongFormat: false });

    // Handle input errors
    if (Name.content.length < 1 || phone.content.length !== 10) {
      if (Name.content.length === 0) {
        setName({ ...Name, empty: true });
      }

      if (phone.content.length !== 10 && phone.content.length !== 0) {
        setPhone({ ...phone, wrongFormat: true, empty: false });
      }

      if (phone.content.length === 0) {
        setPhone({ ...phone, empty: true, wrongFormat: false });
      }

      return;
    }

    setLoading(true);

    //////////////////////////////////////////////////////////

    // Main task for handling register operation
    const q = query(usersRef, where("phonenumber", "==", phone.content));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setGoogleVerifier("block");
      let verify = new RecaptchaVerifier("recaptcha-container", {}, auth);
      signInWithPhoneNumber(auth, "+98" + phone.content, verify)
        .then((result) => {
          setFinal(result);
          console.log("code sent successfully");
          setShow(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          // window.location.reload();
        });
    } else {
      console.log("User exists. please login");
      setLoading(false);
    }

    //////////////////////////////////////////////////////////
  };

  const handleOtp = (e) => {
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
        // console.log("user loged-in succesfully ===> ", result.user.uid);

        let cred = {
          name: Name.content,
          email: email,
          phonenumber: phone.content,
          uid: result.user.uid,
        };

        localStorage.setItem("userCredentials", JSON.stringify(cred));

        // await setDoc(doc(db, "users", result.user.uid), {
        //   name: Name.content,
        //   email: email,
        //   phonenumber: phone.content,
        // });

        setConfirmLoading(false);
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
    <div className="font-poppins relative grid min-h-screen w-screen place-items-center tracking-tight">
      {networkError && (
        <p className="fixed top-0 right-0 left-0 bg-red-400 py-3 text-center text-sm text-white">
          network request failed. check your connection!
        </p>
      )}
      <img
        className="absolute -z-10 h-full w-full object-fill opacity-30"
        src={registerBg}
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
              <h1 className="font-oswald text-3xl font-semibold">
                Create Account
              </h1>
            )}
            <p className="mt-3">Please Register using account detail bellow</p>
          </span>
          <form className="flex w-full flex-col space-y-6">
            <div className="w-full">
              {Name.empty && (
                <p className="mb-1 text-sm text-red-500">required *</p>
              )}
              <input
                value={Name.content}
                onChange={(e) => setName({ ...Name, content: e.target.value })}
                type="text"
                required
                placeholder="Full Name..."
                className={`${
                  Name.empty && "outline outline-2 outline-red-400"
                } w-full p-3 text-sm focus:outline focus:outline-1 focus:outline-red-400`}
              />
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email..."
              className="w-full p-3 text-sm focus:outline focus:outline-1 focus:outline-red-400"
            />
            <div className="w-full">
              {(phone.empty || phone.wrongFormat) && (
                <p className="mb-1 text-sm text-red-500">{`${
                  phone.empty
                    ? "required *"
                    : phone.wrongFormat
                    ? "Invalid input"
                    : ""
                }`}</p>
              )}
              <input
                value={phone.content}
                onChange={(e) =>
                  setPhone({ ...phone, content: e.target.value })
                }
                type="tel"
                required
                maxLength={10}
                minLength={10}
                placeholder="Phone (e.g. 9117778888)"
                className={`${
                  (phone.wrongFormat || phone.empty) &&
                  "outline outline-2 outline-red-400"
                } w-full p-3 text-sm focus:outline focus:outline-1 focus:outline-red-400`}
              />
            </div>

            {!loading && (
              <button
                type="submit"
                onClick={handleRegister}
                className="w-1/3 rounded-3xl bg-[#e98c81] py-2 px-6 text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
              >
                Register
              </button>
            )}
            <div className="font-poppins text-sm text-gray-500">
              Already have account?{" "}
              <p
                onClick={() => navigate("/")}
                className="inline-block w-fit cursor-pointer text-sm font-semibold text-blue-300 transition-colors duration-300 ease-in-out hover:text-red-300"
              >
                Sign-in
              </p>
            </div>
          </form>
          <div className={googleVerifier} id="recaptcha-container"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-14 bg-[#f3f3f3] px-10 py-9">
          <span className="flex flex-col items-center">
            {confirmloading ? (
              <ImSpinner9 className="animate-spin" size={"2rem"} />
            ) : (
              <h1 className="text-2xl font-semibold tracking-tighter">
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
              onClick={handleOtp}
              className="w-fit rounded-3xl bg-[#e98c81] px-5 py-2 text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-black"
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
