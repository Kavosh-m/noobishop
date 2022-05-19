import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

const SearchRoute = () => {
  let params = useParams();

  const [search, setSearch] = useState(params.q);
  const [result, setResult] = useState([]);
  const [sortType, setSortType] = useState("alpha");
  const [isLoaded, setIsLoaded] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const numOfItemsPerPage = 9;
  let numOfItemsVisited = pageNumber * numOfItemsPerPage;
  let numOfPages = Math.ceil(result.length / numOfItemsPerPage);

  const sortBarRef = useRef();

  useEffect(() => {
    if (search.length > 0) {
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
    <div>
      <div className="bg-red-200">{search}</div>
      <div className="grid grid-cols-3 gap-6">
        <div
          ref={sortBarRef}
          className="col-span-full flex items-center justify-between"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-sky-500 focus:outline-0"
            placeholder="search..."
          />
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
        {result
          .slice(numOfItemsVisited, numOfItemsVisited + numOfItemsPerPage)
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
            pageCount={numOfPages}
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
          />
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isLoaded}
        onClick={() => setIsLoaded(true)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SearchRoute;
