import React from "react";
import SearchIcon from "./icons/SearchIcon";

const ShopLeftSidebar = ({
  search,
  setSearch,
  handleSearch,
  currentFood,
  setCurrentFood,
}) => {
  return (
    <div className="flex w-full flex-col bg-red-200 px-6 sm:px-32 lg:mx-0 lg:w-fit lg:px-4">
      <div className="w-2/3 border-b-[1px] border-black pb-[2px]">
        <p className="">Search</p>
      </div>
      <div className="mt-8 flex items-center justify-start">
        <input
          className="basis-11/12 rounded-tl-md rounded-bl-md border-[1px] border-gray-400 p-[0.83rem] text-sm outline-none focus:border-red-400 lg:basis-5/6"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
        />

        <button
          onClick={handleSearch}
          className="grid basis-1/12 place-items-center rounded-tr-md rounded-br-md bg-black p-4 outline outline-1 outline-black lg:basis-1/6"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="mt-14 w-2/3 border-b-[1px] border-black pb-[2px]">
        <p className="">Categories</p>
      </div>
      <div className="mt-3 flex flex-col items-start space-y-2">
        <button
          onClick={() => setCurrentFood({ ...currentFood, name: "burger" })}
          className="py-1 transition duration-300 ease-in-out hover:text-red-400"
        >
          Burger
        </button>
        <button
          onClick={() => setCurrentFood({ ...currentFood, name: "pizza" })}
          className="py-1 transition duration-300 ease-in-out hover:text-red-400"
        >
          Pizza
        </button>
        <button
          onClick={() => setCurrentFood({ ...currentFood, name: "pasta" })}
          className="py-1 transition duration-300 ease-in-out hover:text-red-400"
        >
          Pasta
        </button>
        <button
          onClick={() => setCurrentFood({ ...currentFood, name: "drink" })}
          className="py-1 transition duration-300 ease-in-out hover:text-red-400"
        >
          Drink
        </button>
      </div>
    </div>
  );
};

export default ShopLeftSidebar;
