import { createSlice } from "@reduxjs/toolkit";

interface timersConfiguration {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

const initialState = {
  pomodoro: 2700,
  shortBreak: 300,
  longBreak: 900,
};

const timersSlice = createSlice({
  initialState,
  name: "timers",
  reducers: {},
});
