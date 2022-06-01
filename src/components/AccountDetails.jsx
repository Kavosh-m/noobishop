import React, { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { ImSpinner9 } from "react-icons/im";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import EditIcon from "./icons/EditIcon";
import ProfilePicContainer from "./ProfilePicContainer";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AccountDetails = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditNamePressed, setIsEditNamePressed] = useState(false);
  const [isEditEmailPressed, setIsEditEmailPressed] = useState(false);
  const [isNameLoaded, setIsNameLoaded] = useState(false);
  const [isEmailLoaded, setIsEmailLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const fetchUserData = async () => {
    setIsNameLoaded(false);
    setIsEmailLoaded(false);

    const docRef = doc(db, "users", auth.currentUser?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserName(docSnap.data().name);
      setUserEmail(docSnap.data().email);
    }

    setIsNameLoaded(true);
    setIsEmailLoaded(true);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // console.log("ACTIVE");

    setLoading(true);
    const userDocRef = doc(db, "users", auth.currentUser?.uid);

    if (name.length > 0 && email.length > 0) {
      await updateDoc(userDocRef, {
        name: name,
        email: email,
      });
      setIsEditNamePressed(false);
      setIsEditEmailPressed(false);
      fetchUserData();
    } else {
      if (name.length > 0) {
        await updateDoc(userDocRef, {
          name: name,
        });
        setIsEditNamePressed(false);
        fetchUserData();
      }
      if (email.length > 0) {
        await updateDoc(userDocRef, {
          email: email,
        });
        setIsEditEmailPressed(false);
        fetchUserData();
      }
    }

    setName("");
    setEmail("");
    setOpenToast(true);
    setLoading(false);
  };

  if (auth.currentUser?.providerData[0].providerId === "phone") {
    return (
      <div className="w-full">
        <ProfilePicContainer />
        <div>
          <p className="py-2 text-slate-400">Full Name</p>

          {!isEditNamePressed ? (
            <div className="flex items-center space-x-2">
              {isNameLoaded ? (
                <p className="font-oswald text-lg">{userName}</p>
              ) : (
                <ImSpinner9 className="animate-spin" />
              )}
              <EditIcon
                onClick={() => setIsEditNamePressed(true)}
                className="h-5 w-5 cursor-pointer text-black transition-colors duration-300 ease-in-out hover:text-rose-400"
              />
            </div>
          ) : (
            <div>
              <input
                className={`${
                  auth.currentUser?.providerData[0].providerId !== "phone" &&
                  "hidden"
                } w-full border p-3 outline-none focus:border-red-300`}
                placeholder="New Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                onClick={() => {
                  setIsEditNamePressed(false);
                  setName("");
                }}
                className="font-poppins rounded-3xl bg-rose-400 px-2 py-1 text-xs text-white transition-colors duration-300 ease-in-out hover:bg-slate-400 hover:text-black"
              >
                cancel
              </button>
            </div>
          )}
        </div>
        <div>
          <p className="pt-4 pb-2 text-slate-400">Email Addres</p>
          {!isEditEmailPressed ? (
            <div className="flex items-center space-x-2">
              {isEmailLoaded ? (
                <p className="font-oswald text-lg">{userEmail}</p>
              ) : (
                <ImSpinner9 className="animate-spin" />
              )}
              <EditIcon
                onClick={() => setIsEditEmailPressed(true)}
                className="h-5 w-5 cursor-pointer text-black transition-colors duration-300 ease-in-out hover:text-rose-400"
              />
            </div>
          ) : (
            <div>
              <input
                className={`${
                  auth.currentUser?.providerData[0].providerId !== "phone" &&
                  "hidden"
                } w-full border p-3 outline-none focus:border-red-300`}
                placeholder="New Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={() => {
                  setIsEditEmailPressed(false);
                  setEmail("");
                }}
                className="font-poppins rounded-3xl bg-rose-400 px-2 py-1 text-xs text-white transition-colors duration-300 ease-in-out hover:bg-slate-400 hover:text-black"
              >
                cancel
              </button>
            </div>
          )}
        </div>
        {loading ? (
          <ImSpinner9 className="mt-4 animate-spin" size="2rem" />
        ) : (
          <button
            disabled={name === "" && email === "" ? true : false}
            onClick={handleUpdateProfile}
            className={`${
              auth.currentUser?.providerData[0].providerId !== "phone" &&
              "hidden"
            } mt-4 rounded-3xl bg-red-400 px-8 py-3 uppercase text-white transition-colors duration-300 ease-in-out hover:bg-gray-300 hover:text-black disabled:bg-gray-300 disabled:text-black/40`}
          >
            Save Change
          </button>
        )}

        <Snackbar
          open={openToast}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={() => setOpenToast(false)}
        >
          <Alert
            onClose={() => setOpenToast(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully updated
          </Alert>
        </Snackbar>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ProfilePicContainer />
      <div>
        <p className="py-2 text-slate-400">Full Name</p>
        <p className="font-oswald text-lg">
          {auth.currentUser?.providerData[0].displayName}
        </p>
      </div>
      <div>
        <p className="pt-4 pb-2 text-slate-400">Email Addres</p>
        <p className="font-oswald text-lg">
          {auth.currentUser?.providerData[0].email}
        </p>
      </div>
    </div>
  );
};

export default AccountDetails;
