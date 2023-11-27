import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";
import { TimerTypeConfiguration } from "../interfaces";

const initialState: TimerTypeConfiguration = {
  timerType: 'pomodoro',
}

interface UpdateTimerType {
  timerType: string,
}

const timerTypeConfigurationSlice = createSlice({
  initialState,
  name: 'timerType',
  reducers: {
    setTimerType(
      state: TimerTypeConfiguration,
      action: PayloadAction<UpdateTimerType>
    ) {
      return {
        ...state, 
        timerType: action.payload.timerType,
      }
    }
  }
})

export const { setTimerType } = timerTypeConfigurationSlice.actions;
export const selectTimerType = (state: RootState) => state.timerType;
export default timerTypeConfigurationSlice.reducer;