import { combineReducers} from "redux";
import {createScoreReducer, postResultReducer, getResultReducer} from "./reducers";

const reducers = combineReducers({
    score:createScoreReducer,
    presult: postResultReducer,
    gresult: getResultReducer
});

export default reducers;