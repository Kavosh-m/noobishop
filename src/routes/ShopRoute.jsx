import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import ShopCard from "../components/shop/ShopCard";
// import LoadingIndicator from "../components/LoadingIndicator";
import { CgLayoutGridSmall } from "react-icons/cg";
import { CgLayoutList } from "react-icons/cg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShopLeftSidebar from "../components/ShopLeftSidebar";
// import Sidebar from "../components/Sidebar";
// import Drawer from "@mui/material/Drawer";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import ReactPaginate from "react-paginate";
import ArrowNarrowLeft from "../components/icons/ArrowNarrowLeft";
import ArrowNarrowRight from "../components/icons/ArrowNarrowRight";
import { FaEllipsisH } from "react-icons/fa";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import Carousel from "react-material-ui-carousel";
import { caroImages } from "../constants";
import ScrollToTop from "../components/ScrollToTop";
import { useNavigate } from "react-router-dom";
import useAsyncFoodFetch from "../utils/useAsyncFoodFetch";
import LottieWrapper from "../components/LottieWrapper";
import lottieLoading from "../assets/lottie/94031-loading-animation-for-food-app.json";
import lottieError from "../assets/lottie/82559-error.json";

const ShopRoute = () => {
  // const burgers = useSelector((state) => state.food.burger);
  // const pizzas = useSelector((state) => state.food.pizza);
  // const pastas = useSelector((state) => state.food.pasta);
  // const drinks = useSelector((state) => state.food.drink);
  // const sidebarStatus = useSelector((state) => state.util.sidebar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = useState("burger");
  const [sortType, setSortType] = useState("alpha");
  const foods = useAsyncFoodFetch(category, sortType);
  // const [foods, setFoods] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [gridLayout, setGridLayout] = useState({ grid: true, layout: false });
  const [search, setSearch] = useState("");
  const numOfItemsPerPage = 9;

  const sortBarRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search !== "") {
      navigate(`/search/${search}`);
    } else {
      document.getElementById("searchinput").focus();
    }
  };

  const handleChangeFilter = (event) => {
    setSortType(event.target.value);
  };

  const onPageChange = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo({
      top: sortBarRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  // Save user credentials in firestore
  const saveInFirestore = async () => {
    const saved = localStorage.getItem("userCredentials");
    const initialValue = JSON.parse(saved);

    if (initialValue) {
      await setDoc(doc(db, "users", initialValue.uid), {
        name: initialValue.name,
        email: initialValue.email,
        phonenumber: initialValue.phonenumber,
      });

      //Now we remove item from local storage
      localStorage.removeItem("userCredentials");
    }
  };

  // useEffect(() => {
  //   console.log("shop route ===> ", foods);
  // }, [foods]);

  useEffect(() => {
    setPageNumber(0);
  }, [category]);

  useEffect(() => {
    dispatch(closeSidebar());
  }, [dispatch]);

  useEffect(() => {
    saveInFirestore();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      {/* drawer */}
      {/* <Drawer
        anchor="left"
        open={sidebarStatus}
        onClose={() => dispatch(closeSidebar())}
      >
        <Sidebar />
      </Drawer>

      <Navbar /> */}
      <div className="flex-1 basis-auto bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col">
          {/* Header image goes here */}
          <Carousel
            height={400}
            animation="slide"
            duration={1000}
            interval={3000}
          >
            {caroImages.map((item) => (
              <div className="h-[400px] w-full" key={item.id}>
                {item.content}
              </div>
            ))}
          </Carousel>

          {/* Main page content goes here */}
          <div className="flex flex-col-reverse items-start py-4 lg:flex-row">
            <ShopLeftSidebar
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              category={category}
              setCategory={setCategory}
              // currentFood={currentFood}
              // setCurrentFood={setCurrentFood}
              recentProducts={foods.res?.slice(0, 4)}
            />

            {/* container of layout-sort bar and foods */}
            <div
              ref={sortBarRef}
              className="grid w-full basis-3/4 grid-cols-1 gap-6 gap-x-14 px-6 sm:grid-cols-2 sm:px-20 lg:mx-0 lg:grid-cols-3 lg:px-3"
            >
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
                  onChange={handleChangeFilter}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"alpha"}>Alphabetically, A-Z</MenuItem>
                  <MenuItem value={"priceAsc"}>
                    Sort by price: low to high
                  </MenuItem>
                  <MenuItem value={"priceDesc"}>
                    Sort by price: high to low
                  </MenuItem>
                </Select>
              </div>

              {/* products */}
              {foods.status === "successfull" ? (
                foods.res
                  ?.slice(
                    pageNumber * numOfItemsPerPage,
                    pageNumber * numOfItemsPerPage + numOfItemsPerPage
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`flex ${
                        gridLayout.layout &&
                        "col-span-1 sm:col-span-2 lg:col-span-3"
                      } justify-center bg-gray-100`}
                    >
                      <ShopCard
                        showType={gridLayout.grid ? "grid" : "list"}
                        data={item}
                      />
                    </div>
                  ))
              ) : foods.status === "fetching" ? (
                <div className="col-span-full">
                  <LottieWrapper
                    jsonData={lottieLoading}
                    className="mx-auto w-1/2"
                  />
                </div>
              ) : (
                <div className="col-span-full">
                  <LottieWrapper
                    jsonData={lottieError}
                    className="mx-auto w-2/5"
                  />
                  <p className="font-poppins mt-2 text-center text-sm text-slate-500 sm:text-lg">
                    Something went wrong!
                  </p>
                </div>
              )}

              <div
                className={`${
                  !foods.res && "hidden"
                } col-span-1 flex items-center justify-between border-2 sm:col-span-2 lg:col-span-3`}
              >
                {foods.res && (
                  <ReactPaginate
                    previousLabel={<ArrowNarrowLeft />}
                    previousClassName="px-4 text-gray-600"
                    nextLabel={<ArrowNarrowRight />}
                    nextClassName="px-4 text-gray-600"
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={Math.ceil(foods.res.length / numOfItemsPerPage)}
                    onPageChange={onPageChange}
                    containerClassName="bg-white py-5 flex items-center"
                    pageClassName="mx-1"
                    breakClassName="mx-1"
                    breakLabel={<FaEllipsisH />}
                    activeLinkClassName="text-slate-50 bg-cyan-600 border-0 cursor-default"
                    disabledClassName="text-gray-300"
                    activeClassName=""
                    disabledLinkClassName="text-gray-300 cursor-not-allowed"
                    pageLinkClassName="w-8 border border-slate-300 aspect-square grid place-items-center bg-white rounded-full hover:text-white hover:bg-cyan-600 transition-colors duration-300 ease-in-out"
                    forcePage={pageNumber}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ShopRoute;
