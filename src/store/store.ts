import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/tasksSlice";
import timerConfigReducer from "./slices/timerConfigSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    timerConfig: timerConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
