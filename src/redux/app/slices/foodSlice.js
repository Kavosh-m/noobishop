import { createSlice } from "@reduxjs/toolkit";
import { db, collection, getDocs } from "../../../firebase";
// import { collection, getDocs } from "firebase/firestore";

const initialState = {
  burger: null,
  pizza: null,
  pasta: null,
  drink: null,
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    getBurgers: (state, action) => {
      return {
        ...state,
        burger: action.payload,
      };
    },
    getPizzas: (state, action) => {
      return {
        ...state,
        pizza: action.payload,
      };
    },
    getPastas: (state, action) => {
      return {
        ...state,
        pasta: action.payload,
      };
    },
    getDrinks: (state, action) => {
      return {
        ...state,
        drink: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { getBurgers, getPizzas, getPastas, getDrinks } =
  foodSlice.actions;

export default foodSlice.reducer;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Thunk actions define here:

export const fetchBurgers = () => async (dispatch) => {
  const foodsCol = collection(db, "foods", "burger", "items");
  const burger = [];
  getDocs(foodsCol)
    .then((foodSnapshot) => {
      foodSnapshot.docs.forEach((doc) =>
        burger.push({ ...doc.data(), id: doc.id })
      );
      dispatch(getBurgers(burger));
    })
    .catch((error) => {
      console.log(
        "fetching burgers from firestore is not possible! ===> ",
        error
      );
    });
};

export const fetchPizzas = () => async (dispatch) => {
  const foodsCol = collection(db, "foods", "pizza", "items");
  const pizza = [];
  getDocs(foodsCol)
    .then((foodSnapshot) => {
      foodSnapshot.docs.forEach((doc) =>
        pizza.push({ ...doc.data(), id: doc.id })
      );
      dispatch(getPizzas(pizza));
    })
    .catch((error) => {
      console.log(
        "fetching pizzas from firestore is not possible! ===> ",
        error
      );
    });
};

export const fetchPastas = () => async (dispatch) => {
  const foodsCol = collection(db, "foods", "pasta", "items");
  const pasta = [];
  getDocs(foodsCol)
    .then((foodSnapshot) => {
      foodSnapshot.docs.forEach((doc) =>
        pasta.push({ ...doc.data(), id: doc.id })
      );
      dispatch(getPastas(pasta));
    })
    .catch((error) => {
      console.log(
        "fetching pastas from firestore is not possible! ===> ",
        error
      );
    });
};

export const fetchDrinks = () => async (dispatch) => {
  const foodsCol = collection(db, "foods", "drink", "items");
  const drink = [];
  getDocs(foodsCol)
    .then((foodSnapshot) => {
      foodSnapshot.docs.forEach((doc) =>
        drink.push({ ...doc.data(), id: doc.id })
      );
      dispatch(getDrinks(drink));
    })
    .catch((error) => {
      console.log(
        "fetching drinks from firestore is not possible! ===> ",
        error
      );
    });
};
