
export interface TimerState {
    timerType: string;
    resetTimer: boolean;
    isTimerRunning: boolean;
    timerSeconds: number;
    interval?: number;
}