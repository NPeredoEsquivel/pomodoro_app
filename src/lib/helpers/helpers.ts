import { Task } from "src/store/interfaces";

export const getActiveTask = (tasks: Task[]): Task | undefined => {
  return tasks.find((task) => task.active);
};
