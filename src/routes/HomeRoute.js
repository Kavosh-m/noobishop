import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchBurgers, fetchAllFoods } from "../redux/actions";
import MainWrapper from "../components/MainWrapper";
// import { store } from "../App";

const HomeRoute = () => {
  const all = useSelector((state) => state.foodState);
  const dispatch = useDispatch();

  const [data, setData] = useState(all);
  // console.log("All foods in database ===> ", all);

  // const fetchfood = () => {
  //   const foodsCol = collection(db, "foods", "burger", "items");
  //   const burger = [];
  //   getDocs(foodsCol)
  //     .then((foodSnapshot) => {
  //       foodSnapshot.docs.forEach((doc) =>
  //         burger.push({ ...doc.data(), id: doc.id })
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(
  //         "fetching burgers from firestore is not possible! ===> ",
  //         error
  //       );
  //     });

  //   return {
  //     type: GET_BURGER,
  //     burger: burger,
  //   };
  // };

  // useEffect(() => {
  //   console.log("All foods in database ===> ", all);
  // }, [all]);

  useEffect(() => {
    // dispatch(fetchBurgers());
    dispatch(fetchAllFoods());
    // console.log("after ===> ", store.getState());
  }, [dispatch]);

  return (
    <MainWrapper>
      <div className="my-16 py-20">
        <div className="flex items-center py-6 px-4 space-x-6 overflow-x-auto">
          {all?.pizza?.map((item) => (
            <Card data={item} key={item.id} />
          ))}
        </div>
      </div>
    </MainWrapper>
  );
};

// const mapStateToProps = (store) => ({
//   burgerss: store.foodState.burger,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       fetchBurgers,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute);

export default HomeRoute;
