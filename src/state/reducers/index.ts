import { combineReducers } from 'redux'
import timer from './timerTypeReducer';

const reducers = combineReducers({
    timer,
})

export default reducers;