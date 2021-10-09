import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import countries from "./slices/countries";
export const store = configureStore({
  reducer: {
    countries: countries.reducer,
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
