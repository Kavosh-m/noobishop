import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddressDetails = ({
  address,
  tempAddress,
  setTempAddress,
  isAddressDialogOpen,
  setIsAddressDialogOpen,
  loading,
  onSave,
  onEditAddress,
}) => {
  // const [address, setAddress] = useState("");

  // const [tempAddress, setTempAddress] = useState(address);

  // const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  // const [loading, setLoading] = useState(false);

  // const getAddressFromFirestore = async () => {
  //   const docSnap = await getDoc(doc(db, "users", auth.currentUser?.uid));

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     return docSnap.data().address;
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //     return;
  //   }
  // };

  // const getGeoInfo = () => {
  //   axios
  //     .get("https://ipapi.co/json/")
  //     .then((response) => {
  //       let data = response.data;
  //       // console.log("data Country ====> ", data);

  //       return `${data.country_capital}, ${data.country_name}`;
  //       // setTempAddress(`${data.country_capital}, ${data.country_name}`);
  //     })
  //     .catch((error) => {
  //       console.log("Country code error =====> ", error);
  //       return "Not available😔";
  //     });
  // };

  // const saveAddressToFirestore = async (add) => {
  //   await updateDoc(doc(db, "users", auth.currentUser?.uid), {
  //     address: add,
  //   });
  // };

  // const onSave = async () => {
  //   setAddress(tempAddress);

  //   setLoading(true);
  //   await updateDoc(doc(db, "users", auth.currentUser?.uid), {
  //     address: tempAddress,
  //   });
  //   setLoading(false);

  //   setIsAddressDialogOpen(false);
  // };

  // const onEditAddress = () => {
  //   setTempAddress(address);
  //   setIsAddressDialogOpen(true);
  // };

  // useEffect(() => {
  //   // step 1 : get address from firestore
  //   getDoc(doc(db, "users", auth.currentUser?.uid))
  //     .then((res) => {
  //       if (res.data().address) {
  //         setAddress(res.data().address);
  //       } else {
  //         axios
  //           .get("https://ipapi.co/json/")
  //           .then(async (response) => {
  //             let data = response.data;

  //             setAddress(`${data.country_capital}, ${data.country_name}`);
  //             await updateDoc(doc(db, "users", auth.currentUser?.uid), {
  //               address: `${data.country_capital}, ${data.country_name}`,
  //             });
  //           })
  //           .catch((error) => {
  //             console.log("Country code error =====> ", error);
  //           });
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div>
      {address !== "" ? (
        <div className="font-poppins my-6">{address}</div>
      ) : (
        <p className="my-6 animate-pulse">Fetching address...</p>
      )}
      <button
        onClick={onEditAddress}
        className="font-poppins bg-red-400 px-5 py-3 text-white transition-colors duration-300 ease-in-out hover:bg-slate-300 hover:text-black"
      >
        Edit Address
      </button>

      <Transition show={isAddressDialogOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 z-40 grid place-items-center"
          onClose={() => setIsAddressDialogOpen(false)}
          as="div"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
          <Transition.Child
            as="div"
            className="grid h-full w-full place-items-center"
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-y-12"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 translate-y-12"
          >
            <div className="font-poppins z-10 flex w-11/12 flex-col space-y-12 bg-white px-4 py-3 sm:w-4/5 md:w-3/5 lg:w-2/5">
              <p>Change Address</p>
              <input
                value={tempAddress}
                placeholder="Type your address..."
                onChange={(e) => setTempAddress(e.target.value)}
                className="border border-slate-300 p-3 outline-0 focus:border-2 focus:border-blue-300"
              />
              {loading ? (
                <AiOutlineLoading3Quarters
                  size="2rem"
                  className="animate-spin self-end"
                />
              ) : (
                <div className="flex items-center justify-end space-x-6">
                  <button
                    onClick={() => setIsAddressDialogOpen(false)}
                    className="transition-colors duration-300 ease-in-out hover:text-red-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onSave}
                    className="transition-colors duration-300 ease-in-out hover:text-red-400"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddressDetails;
