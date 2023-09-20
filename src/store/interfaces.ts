export interface Task {
  id: string;
  name: string;
  active: boolean;
  date: string;
  completed: boolean;
}

export interface TimerConfiguration {
  pomodoro: number;
  shortbreak: number;
  longbreak: number;
}
