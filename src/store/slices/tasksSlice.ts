import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { nanoid } from "@reduxjs/toolkit";
import { Task } from "../taskInterface";

const initialState: Task[] = [];

interface UpdateTaskDataPayload {
  taskId: string;
  taskKey: keyof Task;
  taskValue: Task[keyof Task];
}

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    //Get active task here or from the store in the components ?
    updateTask(state: Task[], action: PayloadAction<UpdateTaskDataPayload>) {
      const { taskId, taskKey, taskValue } = action.payload;

      const currentTaskIndex: number = state.findIndex(
        (task) => task.id === taskId
      );

      const updatedTask = {
        ...state[currentTaskIndex],
        [taskKey]: taskValue,
      };

      const updatedStore = [
        ...state.slice(0, currentTaskIndex),
        updatedTask,
        ...state.slice(currentTaskIndex + 1),
      ];
      return updatedStore;
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
            completed: false,
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

export const { addTask, updateTask, removeTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;
