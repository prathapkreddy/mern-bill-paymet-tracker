import { configureStore } from '@reduxjs/toolkit';
import modelsReducer from './slices/modelsSlice';
import accountInfoReducer from './slices/accountInfoSlice';

export const store = configureStore({
    reducer: {
        models: modelsReducer,
        accountInfo: accountInfoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;