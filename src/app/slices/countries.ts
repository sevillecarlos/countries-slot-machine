import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  uniqueCountry: null,
  listCountries: Array<any>(),
  listAllCountries: Array<any>(),

  //promise status
  statusGetAllCountries: "idle",
  statusGetCountry: "idle",
  statusGetListCountries: "idle",

  errorGetCountry: "",
  errorGetListCountries: "",
};

export const getUniqueCountry = createAsyncThunk(
  "auth/getUniqueCountry",
  async (countryQuery: any) => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/countries/${countryQuery}`
      );
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getListCountries = createAsyncThunk(
  "auth/getListCountries",
  async (countryQuery: any) => {
    try {
      const res: any = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/countries`,
        {
          countryQuery,
        }
      );
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getAllCountries = createAsyncThunk(
  "auth/getAllCountries",
  async () => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/countries`
      );
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
      state.listCountries = Array<any>();
    },
  },
  extraReducers: (builder) => {
    /**********************************************************************/
    builder.addCase(getUniqueCountry.fulfilled, (state, action) => {
      state.statusGetCountry = "success";
      state.uniqueCountry = action.payload;
    });
    builder.addCase(getUniqueCountry.pending, (state) => {
      state.statusGetCountry = "loading";
    });
    builder.addCase(
      getUniqueCountry.rejected,
      (state, action: { error: any }) => {
        state.statusGetCountry = "reject";
        state.errorGetCountry = action.error.message;
      }
    );
    /**********************************************************************/
    builder.addCase(getListCountries.fulfilled, (state, action) => {
      state.statusGetListCountries = "success";
      state.listCountries = action.payload;
    });
    builder.addCase(getListCountries.pending, (state) => {
      state.statusGetListCountries = "loading";
    });
    builder.addCase(
      getListCountries.rejected,
      (state, action: { error: any }) => {
        state.statusGetListCountries = "reject";
        state.errorGetListCountries = action.error.message;
      }
    );
    /**********************************************************************/
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.statusGetAllCountries = "success";
      state.listAllCountries = action.payload;
    });
    builder.addCase(getAllCountries.pending, (state) => {
      state.statusGetAllCountries = "loading";
    });
    builder.addCase(getAllCountries.rejected, (state) => {
      state.statusGetAllCountries = "reject";
    });
  },
});

export const countriesAction = countriesSlice.actions;
export default countriesSlice;
