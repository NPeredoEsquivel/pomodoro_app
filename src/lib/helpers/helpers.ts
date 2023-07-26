import { Task } from "src/store/taskInterface";

export const getActiveTask = (tasks: Task[]): Task | undefined => {
  return tasks.find((task) => task.active);
};
