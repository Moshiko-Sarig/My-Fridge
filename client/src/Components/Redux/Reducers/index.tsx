import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";
import userLoginReducer from "./userLoginReducer";

const allReducers = combineReducers({
    logged: userLoginReducer,
    tokenCommands: tokenReducer
});


export default allReducers;