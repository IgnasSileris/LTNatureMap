import { configureStore } from "@reduxjs/toolkit";
import loginStatusReducer from "./reducers/loginStatusReducer";
import displayModeReducer from "./reducers/displayModeReducer";
import timeframeViewReducer from "./reducers/timeframeViewReducer";
import loginModalStatusReducer from "./reducers/loginModalStatusReducer";
import signupModalStatusReducer from "./reducers/signupModalStatusReducer";

export const store = configureStore({
    reducer: {
        loginStatus: loginStatusReducer,
        displayMode: displayModeReducer,
        timeframeView: timeframeViewReducer,
        loginModalStatus: loginModalStatusReducer,
        signupModalStatus: signupModalStatusReducer,
    },
});