import { createSlice } from '@reduxjs/toolkit';

const timeframeViewSlice = createSlice({
    name: 'timeframeView',
    initialState: 'Max',
    reducers: {
        setTimeframeView: (state, action) => {
            return action.payload;
        }
    },
});

export const { setTimeframeView } = timeframeViewSlice.actions;
export default timeframeViewSlice.reducer;