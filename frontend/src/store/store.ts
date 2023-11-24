import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/tasksSlice";
import timerConfigReducer from "./slices/timerConfigSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    timerConfig: timerConfigReducer,
    loggedUser: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
