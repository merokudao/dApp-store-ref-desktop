import { createSlice } from "@reduxjs/toolkit";
import { AppConfig, posConfig } from "../../app/constants";

export interface AppState {
  config: AppConfig;
}

const initialState: AppConfig = posConfig;

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setApp: (state, action) => {
      return action.payload;
    },
  },
});

export const { setApp } = appSlice.actions;

export const getApp = (state: AppState) => (state as any).app;

export default appSlice.reducer;
