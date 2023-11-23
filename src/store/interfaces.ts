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

export interface User {
  username: string;
  password: string;
}

export interface TimerTypeConfiguration {
  timerType: string;
}