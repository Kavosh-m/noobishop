import { useState, useEffect, useCallback } from "react";
import { getDocs, query, orderBy, collectionGroup } from "firebase/firestore";
import { db } from "../firebase";

/*
status ==> fetching/successfull/error
*/

const useAsyncFoodFetch = (cat, sort) => {
  const [data, setData] = useState({ res: null, status: "fetching" });

  const sortType = useCallback(() => {
    let st =
      sort === "alpha"
        ? ["name", "asc"]
        : sort === "priceAsc"
        ? ["price", "asc"]
        : ["price", "desc"];

    return st;
  }, [sort]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((data) => {
          return { ...data, res: null, status: "fetching" };
        });
        let temp = [];
        const foods = query(
          collectionGroup(db, "items"),
          orderBy(sortType()[0], sortType()[1])
        );
        const querySnapshot = await getDocs(foods);
        querySnapshot.forEach((doc) => {
          if (doc.data().category === cat) {
            temp.push({ ...doc.data(), id: doc.id });
          }
        });
        setData((data) => {
          return {
            ...data,
            res: temp.length > 0 ? temp : null,
            status: temp.length > 0 ? "successfull" : "error",
          };
        });
      } catch (error) {
        // console.log("errrrrrrrrorrrrrr ====> ", error);
        setData((data) => {
          return { ...data, res: null, status: "error" };
        });
      }
    };

    fetchData();
  }, [cat, sort, sortType]);

  return data;
};

export default useAsyncFoodFetch;
