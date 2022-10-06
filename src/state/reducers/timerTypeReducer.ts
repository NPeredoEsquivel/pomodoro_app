import {TimerState} from './types/reducerTypes'
import { Action } from '../actions/index';
import { ActionType } from '../action-types';

const defaultState: TimerState = {
    timerType: "pomodoro",
    resetTimer: false,
    isTimerRunning: false,
    timerSeconds: 1500,
}

function reducer(state = defaultState, action: Action) {
    switch(action.type) {
        case ActionType.UPDATE_TIMER:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default reducer;