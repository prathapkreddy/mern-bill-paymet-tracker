import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ApiState {
    data: any;
    loading: boolean;
    error: string | null;
}

const initialState: ApiState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchApiData = createAsyncThunk(
    'api/fetchApiData',
    async (url: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    },
);

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        clearApiData(state) {
            state.data = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApiData.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchApiData.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch API data';
            });
    },
});

export const { clearApiData } = apiSlice.actions;
export default apiSlice.reducer;