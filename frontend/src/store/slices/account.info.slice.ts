import { createSlice } from '@reduxjs/toolkit';

interface AccountInfoState {
    name: string;
    email: string;
}

const initialState: AccountInfoState = {
    name: '',
    email: '',
};

export const accountInfoSlice = createSlice({
    name: 'accountInfo',
    initialState,
    reducers: {
        setAccountInfo: (state, action) => {
            const { name, email } = action.payload;
            state.name = name;
            state.email = email;
        },
    },
});

export const { setAccountInfo } = accountInfoSlice.actions;
export default accountInfoSlice.reducer;
