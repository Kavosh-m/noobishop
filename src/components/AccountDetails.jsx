import React, { useState, forwardRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { ImSpinner9 } from "react-icons/im";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AccountDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // console.log("ACTIVE");

    setLoading(true);
    const userDocRef = doc(db, "users", auth.currentUser?.uid);
    if (name.length > 0) {
      await updateDoc(userDocRef, {
        name: name,
      });
    }
    if (email.length > 0) {
      await updateDoc(userDocRef, {
        email: email,
      });
    }

    setName("");
    setEmail("");
    setOpenToast(true);
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div>
        <p className="py-2 text-slate-400">Full Name</p>
        {auth.currentUser?.providerData[0].providerId !== "phone" && (
          <p className="font-oswald text-lg">
            {auth.currentUser?.providerData[0].displayName}
          </p>
        )}
        <input
          className={`${
            auth.currentUser?.providerData[0].providerId !== "phone" && "hidden"
          } w-full border p-3 outline-0 focus:border-red-300`}
          placeholder="Full Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <p className="pt-4 pb-2 text-slate-400">Email Addres</p>
        {auth.currentUser?.providerData[0].providerId !== "phone" && (
          <p className="font-oswald text-lg">
            {auth.currentUser?.providerData[0].email}
          </p>
        )}
        <input
          className={`${
            auth.currentUser?.providerData[0].providerId !== "phone" && "hidden"
          } w-full border p-3 outline-0 focus:border-red-300`}
          placeholder="Email Addres..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {loading ? (
        <ImSpinner9 className="mt-4 animate-spin" size="2rem" />
      ) : (
        <button
          disabled={name === "" && email === "" ? true : false}
          onClick={handleUpdateProfile}
          className={`${
            auth.currentUser?.providerData[0].providerId !== "phone" && "hidden"
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
          Successfully updated
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AccountDetails;
