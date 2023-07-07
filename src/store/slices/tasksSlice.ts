import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { nanoid } from "@reduxjs/toolkit";
import { Task } from "../taskInterface";

const initialState: Task[] = [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    //Get active task here or from the store in the components ?
    updateTask(state: Task[], action: PayloadAction<Task>) {
      const currentTask: Task | undefined = state.find(
        (task) => task.id === action.payload.id
      );

      const currentTaskIndex: number = state.findIndex(
        (task) => task.id === action.payload.id
      );

      if (currentTask !== undefined) {
        currentTask.active = false;
        state[currentTaskIndex] = currentTask;
      }
    },
    addTask: {
      reducer(state: Task[], action: PayloadAction<Task>) {
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
    removeTask(state: Task[], action: PayloadAction<string>) {
      const taskToRemoveIndex: number = state.findIndex(
        (task) => task.id === action.payload
      );

      state.splice(taskToRemoveIndex, 1);
    },
  },
});

export const { addTask, updateTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;
