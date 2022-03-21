import React, { useEffect, useState, useRef } from "react";
import MainWrapper from "../components/MainWrapper";
import { useSelector } from "react-redux";
import ShopCard from "../components/shop/ShopCard";
import LoadingIndicator from "../components/LoadingIndicator";
import { shopHeader } from "../constants";
import { CgLayoutGridSmall } from "react-icons/cg";
import { CgLayoutList } from "react-icons/cg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SearchIcon from "../components/icons/SearchIcon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShopLeftSidebar from "../components/ShopLeftSidebar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Sidebar from "../components/Sidebar";

const ShopRoute = () => {
  const burgers = useSelector((state) => state.food.burger);
  const pizzas = useSelector((state) => state.food.pizza);
  const pastas = useSelector((state) => state.food.pasta);
  const drinks = useSelector((state) => state.food.drink);

  // const [showType, setShowType] = useState("grid");
  const [currentFood, setCurrentFood] = useState({
    name: "burger",
    data: burgers,
  });
  // const [burgerss, setBurgerss] = useState(null);
  const [gridLayout, setGridLayout] = useState({ grid: true, layout: false });

  const [sortType, setSortType] = useState("alphabetical");
  const [sortToggle, setSortToggle] = useState(false);
  const [search, setSearch] = useState("");

  const [sidebar, setSidebar] = useState(false);

  const handleSearch = () => {
    let allFoods = burgers.concat(pizzas, pastas, drinks);
    // console.log(allFoods);
    let res = allFoods.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    setCurrentFood({ ...currentFood, data: res });
  };

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

  const mainView = useRef(null);

  if (!currentFood.data) {
    return (
      <div className="relative flex h-screen w-screen flex-col items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div ref={mainView} className="relative flex flex-col">
      {sidebar && <Sidebar setSidebar={setSidebar} sidebar={sidebar} />}
      <Navbar setSidebar={setSidebar} />
      <div className="mx-0 flex w-full flex-col">
        {/* Header image goes here */}
        <div className="h-[375px] w-full bg-gray-300">
          <img
            src={shopHeader}
            alt=""
            className="h-full w-full object-cover brightness-50"
          />
        </div>

        {/* Main page content goes here */}
        <div className="flex flex-col-reverse items-start py-4 lg:flex-row">
          <ShopLeftSidebar
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            currentFood={currentFood}
            setCurrentFood={setCurrentFood}
          />

          {/* container of layout-sort bar and foods */}
          <div className="grid w-full grid-cols-1 gap-10 bg-cyan-200 px-6 sm:grid-cols-2 sm:px-32 lg:mx-0 lg:grid-cols-3 lg:px-3">
            {/* container of grid and sort stuff */}
            <div className="xsmall:flex-row xsmall:space-y-0 col-span-1 flex flex-col items-center justify-between space-y-1 border-2 py-3 px-2 sm:col-span-2 sm:px-6 lg:col-span-3">
              {/* container of two layout buttons (grid and list view) */}
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
                    size="2em"
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
                    size="2em"
                  />
                </button>
              </div>

              {/* sort items */}
              <Select
                size="small"
                value={sortType}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"alphabetical"}>Alphabetically, A-Z</MenuItem>
                <MenuItem value={"priceLowToHigh"}>
                  Sort by price: low to high
                </MenuItem>
                <MenuItem value={"priceHighToLow"}>
                  Sort by price: high to low
                </MenuItem>
              </Select>
            </div>

            {/* products */}
            {currentFood.data?.map((item) => (
              <div
                key={item.id}
                className={`flex items-center ${
                  gridLayout.layout && "col-span-1 sm:col-span-2 lg:col-span-3"
                } justify-center bg-gray-100`}
              >
                <ShopCard
                  showType={gridLayout.grid ? "grid" : "list"}
                  data={item}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton target={mainView} />
    </div>
  );
};

export default ShopRoute;
