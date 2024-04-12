import { createSlice } from '@reduxjs/toolkit';

const signupModalStatusSlice = createSlice({
    name: 'signupModalStatus',
    initialState: false,
    reducers: {
        openSignupModal: (state) => {
            return true;
        },
        closeSignupModal: (state) => {
            return false;
        },
    },
});

export const { openSignupModal, closeSignupModal } = signupModalStatusSlice.actions;
export default signupModalStatusSlice.reducer;