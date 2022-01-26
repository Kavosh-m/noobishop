import React, { useEffect, useState } from "react";
import MainWrapper from "../components/MainWrapper";
import { useSelector, useDispatch } from "react-redux";
import { fetchBurgers } from "../redux/actions";
import ShopCard from "../components/shop/ShopCard";
import LoadingIndicator from "../components/LoadingIndicator";
import { shopHeader } from "../constants";
import { CgLayoutGridSmall } from "react-icons/cg";
import { CgLayoutList } from "react-icons/cg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SearchIcon from "../components/icons/SearchIcon";

const ShopRoute = () => {
  const burgerss = useSelector((state) => state.foodState.burger);
  // const burgerss = [...burgerss];
  const dispatch = useDispatch();
  const [gridLayout, setGridLayout] = useState({ grid: true, layout: false });

  const [sortType, setSortType] = useState("alphabetical");
  const [sortToggle, setSortToggle] = useState(false);
  // const [sortData, setSortData] = useState(burgerss);
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  // useEffect(() => {

  // }, [burgerss]);

  // sort by name
  const sort_by_product_name = () => {
    burgerss?.sort((a, b) => {
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
    // setSortData(sorted);
    setSortToggle(!sortToggle);
  };

  // sort by price (low to high)
  const sort_by_product_price_low_to_high = () => {
    burgerss?.sort((a, b) => a.price - b.price);
    // setSortData(sorted);
    setSortToggle(!sortToggle);
  };

  // sort by price (high to low)
  const sort_by_product_price_high_to_low = () => {
    burgerss?.sort((a, b) => b.price - a.price);
    // setSortData(sorted);
    setSortToggle(!sortToggle);
  };

  useEffect(() => {
    if (sortType === "priceLowToHigh") {
      sort_by_product_price_low_to_high();
    } else if (sortType === "priceHighToLow") {
      sort_by_product_price_high_to_low();
    } else {
      sort_by_product_name();
    }
  }, [sortType, burgerss]);

  useEffect(() => {
    dispatch(fetchBurgers());
  }, []);

  if (!burgerss) {
    return (
      <div className="flex flex-col relative items-center justify-center w-screen h-screen">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <MainWrapper>
      <div>
        {/* Header image goes here */}
        <div className="w-full h-[375px] bg-gray-300">
          <img
            src={shopHeader}
            alt=""
            className="w-full h-full object-fill brightness-50"
          />
        </div>

        {/* Main page content goes here */}
        <div className="grid grid-cols-4 mx-10 mt-24">
          <div className="flex flex-col flex-grow-0">
            <div className="w-36 border-b-[1px] border-black pb-[2px]">
              <p className="">Search</p>
            </div>
            <div className="flex items-center justify-start mt-8">
              <input
                className="w-48 p-[0.83rem] border-[1px] text-sm rounded-tl-md rounded-bl-md border-gray-400 focus:border-red-400 outline-none"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(evt) => setSearch(evt.target.value)}
              />

              <button className="rounded-tr-md rounded-br-md p-4 bg-black outline outline-1 outline-black">
                <SearchIcon />
              </button>
            </div>
            <div className="w-36 border-b-[1px] border-black pb-[2px] mt-14">
              <p className="">Categories</p>
            </div>
          </div>

          <div className="col-span-3 flex items-center justify-center">
            <div className="grid grid-cols-3 w-full gap-10">
              <div className="col-span-3 border-2 py-3 px-9 flex items-center justify-between">
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
              {burgerss?.map((item) => (
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
