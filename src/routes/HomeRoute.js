import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import MainWrapper from "../components/MainWrapper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import {
//   fetchPizzas,
//   fetchPastas,
//   fetchDrinks,
// } from "../redux/app/slices/foodSlice";

const HomeRoute = () => {
  const burgers = useSelector((state) => state.food.burger);
  const pizzas = useSelector((state) => state.food.pizza);
  const pastas = useSelector((state) => state.food.pasta);
  const drinks = useSelector((state) => state.food.drink);
  // const dispatch = useDispatch();

  const [all, setAll] = useState(null);

  // useEffect(() => {
  //   dispatch(fetchPizzas());
  //   dispatch(fetchPastas());
  //   dispatch(fetchDrinks());
  // }, [dispatch]);

  useEffect(() => {
    // console.log(pizzas);
    // console.log(pastas);
    // console.log(drinks);
    if (pizzas && pastas && drinks && burgers) {
      let temp = [...burgers, ...pizzas, ...pastas, ...drinks];
      setAll(temp);
    }
  }, [pizzas, pastas, drinks, burgers]);

  return (
    <div className="">
      <Navbar />
      <div className="flex items-center space-x-6 overflow-x-auto py-6 px-4">
        {all?.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomeRoute;
