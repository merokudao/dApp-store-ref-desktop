import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {api} from "../api/api";

import {dAppDataSource} from "../features/dapp/dapp_api";
import {analyticsDataSource} from "../features/analytics/analytics_api";
import {searchDataSource} from '../features/search';

dAppDataSource.registerEndpoints(api);
analyticsDataSource.registerEndpoints(api);
searchDataSource.registerEndpoints(api);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
