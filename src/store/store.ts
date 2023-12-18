import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/tasksSlice";
import timerConfigReducer from "./slices/timerConfigSlice";
import userReducer from "./slices/userSlice";
import timerTypeReducer from "./slices/timerTypeSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    timerConfig: timerConfigReducer,
    loggedUser: userReducer,
    timerType: timerTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
