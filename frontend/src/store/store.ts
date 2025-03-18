import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root.reducer.ts';
import { apiSlice } from './slices/api.slice';

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
