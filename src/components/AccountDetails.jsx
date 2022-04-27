import React from "react";

const AccountDetails = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-between lg:flex-row">
        <div className="lg:basis-[48%]">
          <p className="py-2">First Name</p>
          <input
            className="w-full border p-3 outline-0 focus:border-red-300"
            placeholder="First Name..."
          />
        </div>
        <div className="lg:basis-[48%]">
          <p className="py-2">Last Name</p>
          <input
            className="w-full border p-3 outline-0 focus:border-red-300"
            placeholder="Last Name..."
          />
        </div>
      </div>
      <div>
        <p className="pt-4 pb-2">Email Addres</p>
        <input
          className="w-full border p-3 outline-0 focus:border-red-300"
          placeholder="Email Addres..."
        />
      </div>
      <button className="mt-4 rounded-3xl bg-red-400 px-8 py-3 uppercase text-white transition-colors duration-300 ease-in-out hover:bg-gray-300 hover:text-black">
        Save Change
      </button>
    </div>
  );
};

export default AccountDetails;
