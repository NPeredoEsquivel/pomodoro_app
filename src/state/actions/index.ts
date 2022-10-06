import { TimerState } from '../reducers/types/reducerTypes';

export type Action = {
    type: string,
    payload: TimerState
}