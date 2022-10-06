import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        token: '',
    },
    reducers: {
        addSecret: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        resetSecret: (state) => {
            state.token = '';
        },
    },
});

export const { addSecret, resetSecret } = loginSlice.actions;

export default loginSlice.reducer;
