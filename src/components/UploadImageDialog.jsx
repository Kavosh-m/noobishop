import React from "react";
import { auth } from "../firebase";

const UploadImageDialog = ({
  setImge,
  setIsCameraButtonPressed,
  onRemoveProfilePic,
}) => {
  // const [imge, setImge] = useState(null);

  const isTherePic = () => {
    return auth.currentUser.photoURL ||
      auth.currentUser.providerData[0].photoURL
      ? true
      : false;
  };

  const onSelection = (e) => {
    e.preventDefault();
    setImge(e.target.files[0]);
    setIsCameraButtonPressed(false);

    //Do main upload process
    // onUpload(e.target.files[0]);
  };

  const onCancelUpload = (e) => {
    e.preventDefault();
    setImge(null);
    setIsCameraButtonPressed(false);
  };

  const onDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    setImge(files[0]);
    setIsCameraButtonPressed(false);

    //Do main uploading process
    // onUpload(files[0]);
  };

  return (
    <div className="w-4/6 bg-orange-50 text-black">
      {/* title */}
      <h2 className="font-oswald mt-6 text-center text-2xl">
        Upload your image here
      </h2>

      {/* Drag zone */}
      <div className="relative my-8 flex items-center justify-center bg-pink-200/0">
        <label
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDrop={onDrop}
          id="dropbox"
          className="w-[90%] cursor-pointer border border-dashed border-slate-900 bg-gradient-to-br from-slate-300 to-lime-300 py-10 px-5"
          htmlFor="zoo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-9 w-9 text-center text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="font-poppins mt-2 text-center text-slate-600">
            Drag and drop your image or click here
          </p>
        </label>
        <input
          type="file"
          accept="image/*"
          name="zoo"
          id="zoo"
          className="absolute -z-50 opacity-0"
          onChange={onSelection}
        />
      </div>

      {/* image preview container */}
      {/* <div className="flex h-28 bg-cyan-200/0">
        {imge && (
          <img
            src={URL.createObjectURL(imge)}
            alt=""
            className="ml-[5%] aspect-square h-full object-cover"
          />
        )}
        {imge && (
          <div className="font-poppins ml-3 flex flex-col space-y-3">
            <p>{imge.name}</p>
            <p>{`${(imge.size / 1024).toFixed(2)} KB`}</p>
          </div>
        )}
      </div> */}

      <div className="my-6 flex flex-col items-center space-y-3 px-[5%]">
        {isTherePic() && (
          <button
            onClick={() => onRemoveProfilePic()}
            className="font-poppins w-fit text-center text-rose-700 transition-colors duration-300 ease-in-out hover:text-rose-400"
          >
            Remove current photo
          </button>
        )}
        <button
          onClick={onCancelUpload}
          className="font-poppins w-fit text-center text-slate-900 transition-colors duration-300 ease-in-out hover:text-slate-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadImageDialog;
