import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./carsSlice";

// Add your reducers here as you create them
// import carsReducer from './carsSlice';

const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
