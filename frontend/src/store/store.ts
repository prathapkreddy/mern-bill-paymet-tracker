import { configureStore } from '@reduxjs/toolkit';
import modelsReducer from './slices/modals.slice.ts';
import accountInfoReducer from './slices/account.info.slice.ts';

export const store = configureStore({
    reducer: {
        modals: modelsReducer,
        accountInfo: accountInfoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
