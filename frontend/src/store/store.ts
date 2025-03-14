import { configureStore } from '@reduxjs/toolkit';
import modelsReducer from './slices/modals.slice.ts';
import accountInfoReducer from './slices/account.info.slice.ts';
import apiReducer, { apiSlice } from './slices/api.slice.ts';

export const store = configureStore({
    reducer: {
        modals: modelsReducer,
        accountInfo: accountInfoReducer,
        api: apiReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
