import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  uniqueCountry: null,
  listCountries: Array<any>(),
  status: "idle",
};

export const getUniqueCountry = createAsyncThunk(
  "auth/getUniqueCountry",
  async (countryQuery: any) => {
    try {
      const res: any = await axios.post(`http://localhost:8080/country`, {
        countryQuery,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getListCountries = createAsyncThunk(
  "auth/getListCountries",
  async (countryQuery: any) => {
    try {
      const res: any = await axios.post(`http://localhost:8080/countries`, {
        countryQuery,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const countriesSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearListCountries(state) {
      state.listCountries = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUniqueCountry.fulfilled, (state, action) => {
      state.status = "success";
      state.uniqueCountry = action.payload;
    });
    builder.addCase(getUniqueCountry.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUniqueCountry.rejected, (state) => {
      state.status = "reject";
    });
    /**********************************************************************/
    builder.addCase(getListCountries.fulfilled, (state, action) => {
      state.status = "success";
      state.listCountries = action.payload;
    });
    builder.addCase(getListCountries.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getListCountries.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const countriesAction = countriesSlice.actions;
export default countriesSlice;
