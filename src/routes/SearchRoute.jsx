import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { collectionGroup, getDocs, orderBy, query } from "firebase/firestore";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import ShopCard from "../components/shop/ShopCard";
import { db } from "../firebase";
import ArrowNarrowLeft from "../components/icons/ArrowNarrowLeft";
import ArrowNarrowRight from "../components/icons/ArrowNarrowRight";
import { FaEllipsisH } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { ImSad2 } from "react-icons/im";
import ScrollToTop from "../components/ScrollToTop";

const SearchRoute = () => {
  let params = useParams();

  const navigate = useNavigate();

  const [search, setSearch] = useState(params.q);
  const [result, setResult] = useState([]);
  const [sortType, setSortType] = useState("alpha");
  const [isLoaded, setIsLoaded] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const numOfItemsPerPage = 9;
  // let numOfItemsVisited = pageNumber * numOfItemsPerPage;
  // let numOfPages = Math.ceil(result.length / numOfItemsPerPage);

  const sortBarRef = useRef();

  useEffect(() => {
    if (search.length > 0) {
      setPageNumber(0);
      sortByName();
    }
  }, [search]);

  //Functions
  const sortByName = async () => {
    setIsLoaded(false);
    let temp = [];
    const foods = query(collectionGroup(db, "items"), orderBy("name"));
    const querySnapshot = await getDocs(foods);
    // console.log("Number of foods ==> ", querySnapshot.size);
    querySnapshot.forEach((doc) => {
      if (doc.data().name.toLowerCase().includes(search.toLowerCase())) {
        temp.push({ ...doc.data(), id: doc.id });
      }
    });
    // console.log(temp);
    setResult(temp);
    setIsLoaded(true);
  };

  const sortByPriceAsc = async () => {
    setIsLoaded(false);
    let temp = [];
    const foods = query(collectionGroup(db, "items"), orderBy("price"));
    const querySnapshot = await getDocs(foods);
    // console.log("Number of foods ==> ", querySnapshot.size);
    querySnapshot.forEach((doc) => {
      if (doc.data().name.toLowerCase().includes(search.toLowerCase())) {
        temp.push({ ...doc.data(), id: doc.id });
      }
    });
    // console.log(temp);
    setResult(temp);
    setIsLoaded(true);
  };

  const sortByPriceDesc = async () => {
    setIsLoaded(false);
    let temp = [];
    const foods = query(collectionGroup(db, "items"), orderBy("price", "desc"));
    const querySnapshot = await getDocs(foods);
    // console.log("Number of foods ==> ", querySnapshot.size);
    querySnapshot.forEach((doc) => {
      if (doc.data().name.toLowerCase().includes(search.toLowerCase())) {
        temp.push({ ...doc.data(), id: doc.id });
      }
    });
    // console.log(temp);
    setResult(temp);
    setIsLoaded(true);
  };

  const handleChangeFilter = (e) => {
    let t = e.target.value;

    setSortType(t);

    switch (t) {
      case "priceAsc":
        sortByPriceAsc();
        break;
      case "priceDesc":
        sortByPriceDesc();
        break;
      default:
        sortByName();
    }
  };

  const onPageChange = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo({
      top: sortBarRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex justify-center">
      <div className="mx-auto mt-14 w-full max-w-6xl space-y-4 px-4 sm:px-6 md:px-4 lg:px-10">
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer transition-colors duration-300 ease-in-out hover:text-rose-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => navigate(-1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <p>Back</p>
        </div>
        <div
          ref={sortBarRef}
          className="col-span-full flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
        >
          <div className="flex items-center border border-slate-300 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-2 py-1 outline-none focus:outline-none"
              placeholder="search..."
            />
          </div>
          <Select
            size="small"
            value={sortType}
            onChange={handleChangeFilter}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"alpha"}>Sort by name</MenuItem>
            <MenuItem value={"priceAsc"}>Sort by price: low to high</MenuItem>
            <MenuItem value={"priceDesc"}>Sort by price: high to low</MenuItem>
          </Select>
        </div>
        {search.length !== 0 && (
          <div className="font-poppins bg-white text-xl font-semibold">{`Results for "${search}"`}</div>
        )}
        {result.length === 0 ? (
          <div className="space-y-3 pt-14">
            <ImSad2
              className="mx-auto"
              size="4rem"
              style={{ color: "black" }}
            />
            <p className="font-poppins text-center text-xl font-bold text-slate-400">
              Nothing found!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 bg-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {result
              .slice(
                pageNumber * numOfItemsPerPage,
                pageNumber * numOfItemsPerPage + numOfItemsPerPage
              )
              .map((food) => (
                <ShopCard key={food.id} data={food} showType="grid" />
              ))}
            <div className="col-span-full">
              <ReactPaginate
                previousLabel={<ArrowNarrowLeft />}
                previousClassName="px-4 text-gray-600"
                nextLabel={<ArrowNarrowRight />}
                nextClassName="px-4 text-gray-600"
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(result.length / numOfItemsPerPage)}
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
            </div>
          </div>
        )}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isLoaded}
        onClick={() => setIsLoaded(true)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ScrollToTop />
    </div>
  );
};

export default SearchRoute;
