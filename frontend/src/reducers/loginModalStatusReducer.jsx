import { createSlice } from '@reduxjs/toolkit';

const loginModalStatusSlice = createSlice({
    name: 'loginModalStatus',
    initialState: false,
    reducers: {
        openLoginModal: (state) => {
            return true;
        },
        closeLoginModal: (state) => {
            return false;
        },
    },
});

export const { openLoginModal, closeLoginModal } = loginModalStatusSlice.actions;
export default loginModalStatusSlice.reducer;