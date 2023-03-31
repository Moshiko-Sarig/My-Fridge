import { combineReducers } from "redux";
import userLoginReducer from "./userLoginReducer";

const allReducers = combineReducers({
    logged: userLoginReducer,
});


export default allReducers;