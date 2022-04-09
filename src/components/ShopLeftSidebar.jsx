import React from "react";
import SearchIcon from "./icons/SearchIcon";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

const ShopLeftSidebar = ({
  search,
  setSearch,
  handleSearch,
  currentFood,
  setCurrentFood,
  recentProducts,
}) => {
  return (
    <div className="font-oswald flex w-full basis-1/4 flex-col px-6 sm:px-32 lg:mx-0 lg:w-fit lg:px-4">
      <div className="w-2/3 border-b-[1px] border-black pb-[2px]">
        <h3 className="whitespace-nowrap text-xl font-medium">Search</h3>
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
          className="group grid basis-1/12 place-items-center rounded-tr-md rounded-br-md bg-black p-4 outline outline-1 outline-black lg:basis-1/6"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="mt-14 w-2/3 border-b-[1px] border-black pb-[2px]">
        <p className="text-xl font-medium">Categories</p>
      </div>
      <div className="font-poppins mt-3 flex flex-col items-start space-y-2 text-sm font-medium">
        <button
          onClick={() => setCurrentFood({ ...currentFood, name: "burger" })}
          className={`py-1 ${
            currentFood.name === "burger" ? "text-red-400" : "text-[#252525]"
          } transition duration-300 ease-in-out hover:text-red-400`}
        >
          Burger
        </button>
        <button
          onClick={() => setCurrentFood({ ...currentFood, name: "pizza" })}
          className={`py-1 ${
            currentFood.name === "pizza" ? "text-red-400" : "text-[#252525]"
          } transition duration-300 ease-in-out hover:text-red-400`}
        >
          Pizza
        </button>
        <button
          onClick={() => setCurrentFood({ ...currentFood, name: "pasta" })}
          className={`py-1 ${
            currentFood.name === "pasta" ? "text-red-400" : "text-[#252525]"
          } transition duration-300 ease-in-out hover:text-red-400`}
        >
          Pasta
        </button>
        <button
          onClick={() => setCurrentFood({ ...currentFood, name: "drink" })}
          className={`py-1 ${
            currentFood.name === "drink" ? "text-red-400" : "text-[#252525]"
          } transition duration-300 ease-in-out hover:text-red-400`}
        >
          Drink
        </button>
      </div>
      <div className="mt-14 w-2/3 border-b-[1px] border-black pb-[2px]">
        <h3 className="whitespace-nowrap text-xl font-medium">
          Recent Products
        </h3>
      </div>
      <div className="mt-3 space-y-3">
        {recentProducts?.map((item) => (
          <div className="flex items-center gap-3">
            <Link
              to={{
                pathname: `/products/${item.id}`,
              }}
              state={item}
              className="aspect-square w-20"
            >
              <img
                src={item.picurl}
                alt=""
                className="h-full w-full object-fill"
              />
            </Link>
            <div className="font-poppins flex flex-col justify-center text-sm text-[#303030]">
              <Link
                to={{
                  pathname: `/products/${item.id}`,
                }}
                state={item}
                className="whitespace-nowrap font-semibold transition-all duration-300 ease-in-out hover:text-red-400"
              >
                {item.name}
              </Link>
              <section className="flex items-center justify-start gap-3">
                <p>${(item.price * 0.8).toFixed(2)}</p>
                <p className="text-gray-400 line-through">
                  ${item.price.toFixed(2)}
                </p>
              </section>
              <Rating
                value={4}
                precision={0.5}
                size="small"
                style={{ color: "#E98C81" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopLeftSidebar;
