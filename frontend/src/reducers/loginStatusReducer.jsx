import { createSlice } from '@reduxjs/toolkit';

const loginStatusSlice = createSlice({
    name: 'loginStatus',
    initialState: false,
    reducers: {
        login: (state) => {
            return true;
        },
        logout: (state) => {
            return false;
        },
    },
});

export const { login, logout } = loginStatusSlice.actions;
export default loginStatusSlice.reducer;