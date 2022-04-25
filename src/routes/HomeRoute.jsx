import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
// import MainWrapper from "../components/MainWrapper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Drawer from "@mui/material/Drawer";
import { closeSidebar } from "../redux/app/slices/utilSlice";

const HomeRoute = () => {
  const burgers = useSelector((state) => state.food.burger);
  const pizzas = useSelector((state) => state.food.pizza);
  const pastas = useSelector((state) => state.food.pasta);
  const drinks = useSelector((state) => state.food.drink);

  const sidebarStatus = useSelector((state) => state.util.sidebar);

  const dispatch = useDispatch();

  const [all, setAll] = useState(null);

  useEffect(() => {
    if (pizzas && pastas && drinks && burgers) {
      let temp = [...burgers, ...pizzas, ...pastas, ...drinks];
      setAll(temp);
    }
  }, [pizzas, pastas, drinks, burgers]);

  useEffect(() => {
    dispatch(closeSidebar());
  }, []);

  return (
    <div className="">
      <Drawer
        anchor="left"
        open={sidebarStatus}
        onClose={() => dispatch(closeSidebar())}
      >
        <Sidebar />
      </Drawer>
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
