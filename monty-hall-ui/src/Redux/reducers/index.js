import { combineReducers} from "redux";
import {createScoreReducer} from "./reducers";

const reducers = combineReducers({
    score:createScoreReducer
});

export default reducers;