import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  winningCoins: 0,
};

export const getSlotMachineResult = createAsyncThunk(
  "slot-machine/getSlotMachineResult",
  async (reels: any) => {
    try {
      console.log(reels);
      const res: any = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/slot-machine`,
        reels
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const slotMachineSlice = createSlice({
  name: "slot-machine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**********************************************************************/
    builder.addCase(getSlotMachineResult.fulfilled, (state, action) => {
      state.status = "success";
      console.log(action.payload)
      const { coins } = action.payload;
      state.winningCoins = coins;
    });
    builder.addCase(getSlotMachineResult.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSlotMachineResult.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const slotMachineAction = slotMachineSlice.actions;
export default slotMachineSlice;
