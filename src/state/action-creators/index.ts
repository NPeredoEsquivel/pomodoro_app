import { ActionType } from "../action-types"
import { TimerState } from "../reducers/types/reducerTypes"
import { Dispatch } from 'redux';
import { Action } from "../actions";


export const updateTimer = (timer: TimerState) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_TIMER,
            payload: timer,
        })
    }
}