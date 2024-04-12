import { createSlice } from '@reduxjs/toolkit';

const displayModeSlice = createSlice({
    name: 'displayMode',
    initialState: 'Map',
    reducers: {
        setDisplayMode: (state, action) => {
            return action.payload;
        }
    },
});

export const { setDisplayMode } = displayModeSlice.actions;
export default displayModeSlice .reducer;