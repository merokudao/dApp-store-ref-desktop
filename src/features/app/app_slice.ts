import { RootState, AppThunk } from '../../store';
import {AppConfig, posConfig} from "../../app/constants.js";
import {createSlice} from "@reduxjs/toolkit";

export interface AppState {
    config: AppConfig;
}

const initialState: AppConfig = posConfig;

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setApp: (state, action) => {
            return action.payload;
        },
    },
});

export const { setApp } = appSlice.actions;


export const getApp = (state: AppState) => state.app;

export default appSlice.reducer;
