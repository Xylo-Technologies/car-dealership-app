import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  trim?: string;
  mileage?: number;
  price: number;
  VIN: string;
  condition: "new" | "used" | "certified";
  fuelType?: string;
  transmission?: string;
  engine?: string;
  drivetrain?: string;
  color?: string;
  features?: string[];
  images?: { url: string; caption?: string }[];
  videos?: { url: string }[];
  status?: "Active" | "Sold" | "Reserved" | "Pending";
  dealership: string;
  createdAt?: string;
  updatedAt?: string;
  exteriorColor?: string;
  interiorColor?: string;
  stockNumber?: string;
}

interface CarsState {
  cars: Car[];
  car: Car | null;
  loading: boolean;
  error: string | null;
}

const initialState: CarsState = {
  cars: [],
  car: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/cars");
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/api/cars/${id}`);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const createCar = createAsyncThunk(
  "cars/create",
  async (carData: FormData, thunkAPI) => {
    try {
      const response = await axios.post("/api/cars", carData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const updateCar = createAsyncThunk(
  "cars/update",
  async ({ id, carData }: { id: string; carData: FormData }, thunkAPI) => {
    try {
      const response = await axios.put(`/api/cars/${id}`, carData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/api/cars/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all cars
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch car by ID
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create car
      .addCase(createCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars.push(action.payload);
      })
      .addCase(createCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update car
      .addCase(updateCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car
        );
        if (state.car && state.car._id === action.payload._id) {
          state.car = action.payload;
        }
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete car
      .addCase(deleteCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.filter((car) => car._id !== action.payload);
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default carsSlice.reducer;
