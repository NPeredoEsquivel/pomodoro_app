import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/tasksSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
