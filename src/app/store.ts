import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import countriesSlice from "./slices/countries";
import slotMachineSlice from "./slices/slot-machine";
export const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
    slotMachine: slotMachineSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
