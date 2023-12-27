import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TimerConfiguration } from "../interfaces";

const initialState: TimerConfiguration = {
  pomodoro: 2700,
  shortbreak: 300,
  longbreak: 900,
};

interface UpdateTimerConfiguration {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}
const timerConfigurationSlice = createSlice({
  initialState,
  name: "timers",
  reducers: {
    setTimerConfiguration(
      state: TimerConfiguration,
      action: PayloadAction<UpdateTimerConfiguration>
    ) {
      const { pomodoroTime, shortBreakTime, longBreakTime } = action.payload;
      return {
        ...state,
        pomodoro: pomodoroTime,
        shortbreak: shortBreakTime,
        longbreak: longBreakTime,
      };
    },
  },
});

export const { setTimerConfiguration } = timerConfigurationSlice.actions;
export const selectTimerConfiguration = (state: RootState) => state.timerConfig;
export default timerConfigurationSlice.reducer;
