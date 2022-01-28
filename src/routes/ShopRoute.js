import React, { useEffect, useState } from "react";
import MainWrapper from "../components/MainWrapper";
import { useSelector } from "react-redux";
// import {
//   fetchBurgers,
//   fetchPizzas,
//   fetchPastas,
//   fetchDrinks,
// } from "../redux/app/slices/foodSlice";
import ShopCard from "../components/shop/ShopCard";
import LoadingIndicator from "../components/LoadingIndicator";
import { shopHeader } from "../constants";
import { CgLayoutGridSmall } from "react-icons/cg";
import { CgLayoutList } from "react-icons/cg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SearchIcon from "../components/icons/SearchIcon";

const ShopRoute = () => {
  const burgers = useSelector((state) => state.food.burger);
  const pizzas = useSelector((state) => state.food.pizza);
  const pastas = useSelector((state) => state.food.pasta);
  const drinks = useSelector((state) => state.food.drink);

  const [currentFood, setCurrentFood] = useState({
    name: "burger",
    data: burgers,
  });
  // const [burgerss, setBurgerss] = useState(null);
  const [gridLayout, setGridLayout] = useState({ grid: true, layout: false });

  const [sortType, setSortType] = useState("alphabetical");
  const [sortToggle, setSortToggle] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  const handleChangeCategory = () => {
    if (currentFood.name === "burger") {
      setCurrentFood({ ...currentFood, data: burgers });
      setSortToggle(!sortToggle);
    } else if (currentFood.name === "pizza") {
      setCurrentFood({ ...currentFood, data: pizzas });
      setSortToggle(!sortToggle);
    } else if (currentFood.name === "pasta") {
      setCurrentFood({ ...currentFood, data: pastas });
      setSortToggle(!sortToggle);
    } else {
      setCurrentFood({ ...currentFood, data: drinks });
      setSortToggle(!sortToggle);
    }
  };

  useEffect(() => {
    handleChangeCategory();
  }, [currentFood.name]);

  // sort by name
  const sort_by_product_name = () => {
    const b = [...currentFood.data];
    b?.sort((a, b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    setCurrentFood({ ...currentFood, data: b });
    setSortToggle(!sortToggle);
  };

  // sort by price (low to high)
  const sort_by_product_price_low_to_high = () => {
    const b = [...currentFood.data];
    b?.sort((a, b) => a.price - b.price);
    // setSortData(sorted);
    setCurrentFood({ ...currentFood, data: b });
    setSortToggle(!sortToggle);
  };

  // sort by price (high to low)
  const sort_by_product_price_high_to_low = () => {
    const b = [...currentFood.data];
    b?.sort((a, b) => b.price - a.price);
    // setSortData(sorted);
    setCurrentFood({ ...currentFood, data: b });
    setSortToggle(!sortToggle);
  };

  useEffect(() => {
    if (currentFood.data) {
      if (sortType === "priceLowToHigh") {
        sort_by_product_price_low_to_high();
      } else if (sortType === "priceHighToLow") {
        sort_by_product_price_high_to_low();
      } else {
        sort_by_product_name();
      }
    }
  }, [sortType]);

  // useEffect(() => {

  // }, [dispatch]);

  if (!currentFood.data) {
    return (
      <div className="relative flex h-screen w-screen flex-col items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <MainWrapper>
      <div>
        {/* Header image goes here */}
        <div className="h-[375px] w-full bg-gray-300">
          <img
            src={shopHeader}
            alt=""
            className="h-full w-full object-fill brightness-50"
          />
        </div>

        {/* Main page content goes here */}
        <div className="mx-10 mt-24 grid grid-cols-4">
          <div className="flex flex-grow-0 flex-col">
            <div className="w-36 border-b-[1px] border-black pb-[2px]">
              <p className="">Search</p>
            </div>
            <div className="mt-8 flex items-center justify-start">
              <input
                className="w-48 rounded-tl-md rounded-bl-md border-[1px] border-gray-400 p-[0.83rem] text-sm outline-none focus:border-red-400"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(evt) => setSearch(evt.target.value)}
              />

              <button className="rounded-tr-md rounded-br-md bg-black p-4 outline outline-1 outline-black">
                <SearchIcon />
              </button>
            </div>
            <div className="mt-14 w-36 border-b-[1px] border-black pb-[2px]">
              <p className="">Categories</p>
            </div>
            <div className="mt-3 flex flex-col items-start space-y-2">
              <button
                onClick={() =>
                  setCurrentFood({ ...currentFood, name: "burger" })
                }
                className="py-1 transition duration-300 ease-in-out hover:text-red-400"
              >
                Burger
              </button>
              <button
                onClick={() =>
                  setCurrentFood({ ...currentFood, name: "pizza" })
                }
                className="py-1 transition duration-300 ease-in-out hover:text-red-400"
              >
                Pizza
              </button>
              <button
                onClick={() =>
                  setCurrentFood({ ...currentFood, name: "pasta" })
                }
                className="py-1 transition duration-300 ease-in-out hover:text-red-400"
              >
                Pasta
              </button>
              <button
                onClick={() =>
                  setCurrentFood({ ...currentFood, name: "drink" })
                }
                className="py-1 transition duration-300 ease-in-out hover:text-red-400"
              >
                Drink
              </button>
            </div>
          </div>

          <div className="col-span-3 flex items-center justify-center">
            <div className="grid w-full grid-cols-3 gap-10">
              <div className="col-span-3 flex items-center justify-between border-2 py-3 px-9">
                <div className="flex items-center justify-center space-x-1">
                  <button
                    onClick={() =>
                      setGridLayout({
                        ...gridLayout,
                        grid: true,
                        layout: false,
                      })
                    }
                  >
                    <CgLayoutGridSmall
                      className={`${
                        gridLayout.grid && "border-[1px] border-black"
                      }`}
                      size="3em"
                    />
                  </button>
                  <button
                    onClick={() =>
                      setGridLayout({
                        ...gridLayout,
                        grid: false,
                        layout: true,
                      })
                    }
                  >
                    <CgLayoutList
                      className={`${
                        gridLayout.layout && "border-[1px] border-black"
                      }`}
                      size="3em"
                    />
                  </button>
                </div>
                <Select
                  value={sortType}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"alphabetical"}>
                    Alphabetically, A-Z
                  </MenuItem>
                  <MenuItem value={"priceLowToHigh"}>
                    Sort by price: low to high
                  </MenuItem>
                  <MenuItem value={"priceHighToLow"}>
                    Sort by price: high to low
                  </MenuItem>
                </Select>
              </div>
              {currentFood.data?.map((item) => (
                <div className="flex items-center justify-center bg-gray-100">
                  <ShopCard key={item.id} data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default ShopRoute;
