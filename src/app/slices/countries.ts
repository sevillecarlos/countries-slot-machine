import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  uniqueCountry: null,
  status: "idle",
};

export const getUniqueCountry = createAsyncThunk(
  "auth/getUniqueCountry",
  async (countryQuery: string) => {
    try {
      const res = await fetch(`http://localhost:8080/country`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(countryQuery),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const countriesSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
  },
});

export const countriesAction = countriesSlice.actions;
export default countriesSlice;
