import React, { useEffect, useState } from "react";
import { auth, storage } from "../firebase";
import CameraIcon from "./icons/CameraIcon";
import ImagePlaceholder from "./icons/ImagePlaceholder";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { Backdrop } from "@mui/material";
import UploadImageDialog from "./UploadImageDialog";
import CustomAlert from "./CustomAlert";
import LottieWrapper from "../components/LottieWrapper";
import lottieLoading from "../assets/lottie/106434-hour-glass-loading.json";

const ProfilePicContainer = () => {
  const [imge, setImge] = useState(null);
  const [isCameraButtonPressed, setIsCameraButtonPressed] = useState(false);
  const [picProfileUpdating, setPicProfileUpdating] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showRemovingAlert, setShowRemovingAlert] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState(true);
  const [isRemovingProfilePicSuccessfull, setIsRemovingProfilePicSuccessfull] =
    useState(true);
  const { photoURL, providerId } = auth.currentUser.providerData[0];
  //   console.log("ppppppppphhhhoto ====> ", photoURL);
  //   console.log("ppppppppphhhhotozzzzzzzz ====> ", auth.currentUser.photoURL);

  const onCameraClick = (e) => {
    e.preventDefault();
    setIsCameraButtonPressed(true);
  };

  const onUpload = (img) => {
    // e.preventDefault();
    // setSelectedImage(e.target.files[0]);
    // let imgFile = e.target.files[0];

    if (img) {
      //Do the upload process

      setPicProfileUpdating(true);

      const storageRef = ref(
        storage,
        `UsersProfilePics/${auth.currentUser.uid}/profile_pic.png`
      );

      const uploadTask = uploadBytesResumable(storageRef, img);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          // let progress = (
          //   (snapshot.bytesTransferred / snapshot.totalBytes) *
          //   100
          // ).toFixed(0);
          // console.log("Upload is " + progress + "% done");
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        (error) => {
          // Handle unsuccessful uploads
          setPicProfileUpdating(false);

          setIsSuccessfull(false);
          setShowAlert(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...

          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              // console.log("File available at", downloadURL);
              updateProfile(auth.currentUser, { photoURL: downloadURL })
                .then(() => {
                  // console.log("user photoURL updated");
                  // setIsPhotoUrlUpdated(true);
                  setIsSuccessfull(true);
                  setShowAlert(true);
                })
                .catch(() => {
                  // console.log("user photoURL not updated!");
                  // setIsPhotoUrlUpdated(true);
                  setIsSuccessfull(false);
                  setShowAlert(true);
                })
                .finally(() => {
                  setPicProfileUpdating(false);
                });
            })
            .catch((error) => {
              // console.log("getting download url failed!");
              setIsSuccessfull(false);
              setShowAlert(true);
            })
            .finally(() => {
              setPicProfileUpdating(false);
            });
        }
      );
    }
  };

  const onRemoveProfilePic = () => {
    setIsCameraButtonPressed(false);
    setPicProfileUpdating(true);
    updateProfile(auth.currentUser, { photoURL: "" })
      .then(() => {
        //successfully removed
        // console.log(auth.currentUser);
        setIsRemovingProfilePicSuccessfull(true);
        setShowRemovingAlert(true);
      })
      .catch((error) => {
        //Error occured
        setIsRemovingProfilePicSuccessfull(false);
        setShowRemovingAlert(true);
      })
      .finally(() => {
        setPicProfileUpdating(false);
      });
  };

  // useEffect(() => {
  //     console.log(selectedImage);
  // }, [picProfileUpdating, isRemovingProfilePicSuccessfull]);

  // useEffect(() => {
  //   console.log(auth.currentUser);
  // }, []);

  useEffect(() => {
    if (imge) {
      onUpload(imge);
      setImge(null);
    }
  }, [imge]);

  return (
    <div className="relative mx-auto mt-4 grid aspect-square w-1/2 place-items-center rounded-full bg-slate-200 shadow-lg sm:w-1/4">
      {photoURL || auth.currentUser.photoURL ? (
        <img
          src={photoURL || auth.currentUser.photoURL}
          alt=""
          className="aspect-square w-full rounded-full object-cover"
        />
      ) : (
        <ImagePlaceholder className="h-11/12 w-11/12 text-slate-700" />
      )}

      {picProfileUpdating && (
        <div className="absolute inset-0 grid place-items-center rounded-full bg-slate-400/60">
          <LottieWrapper
            jsonData={lottieLoading}
            className="aspect-square w-11/12"
          />
        </div>
      )}

      {/* camera button */}
      <button
        onClick={onCameraClick}
        className={`${
          providerId !== "phone" && "hidden"
        } group absolute right-0 top-3/4 grid aspect-square w-1/4 place-items-center rounded-full bg-gradient-to-br from-indigo-300 to-cyan-300 shadow-md shadow-cyan-100 transition-colors duration-300 ease-in-out hover:bg-gradient-to-tl hover:from-indigo-700 hover:to-black`}
      >
        <CameraIcon className="h-3/5 w-3/5 text-black transition-colors duration-300 ease-in-out group-hover:text-white" />
      </button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isCameraButtonPressed}
        // onClick={() => setIsUploadRunning(false)}
      >
        {/* <CircularProgressbar value={uploadProgress} /> */}
        <UploadImageDialog
          setImge={setImge}
          setIsCameraButtonPressed={setIsCameraButtonPressed}
          onRemoveProfilePic={onRemoveProfilePic}
        />
      </Backdrop>
      <CustomAlert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        alertType={isSuccessfull ? "success" : "error"}
        message={isSuccessfull ? "Updated successfully" : "Update failed!"}
      />
      <CustomAlert
        isOpen={showRemovingAlert}
        onClose={() => setShowRemovingAlert(false)}
        alertType={isRemovingProfilePicSuccessfull ? "success" : "error"}
        message={
          isRemovingProfilePicSuccessfull
            ? "Removed successfully"
            : "Something went wrong!"
        }
      />
    </div>
  );
};

export default ProfilePicContainer;
