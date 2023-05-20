import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { nanoid } from "@reduxjs/toolkit";

//Type for the slice state.
export interface Task {
  id: string;
  name: string;
  active: boolean;
  date: string;
}

//Initial state.
const initialState: Task[] = [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.forEach((obj) => (obj.active = false));
        state.push(action.payload);
      },
      prepare(name: string) {
        return {
          payload: {
            id: nanoid(),
            name: name,
            active: true,
            date: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const { addTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;
