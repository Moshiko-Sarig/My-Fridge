import { combineReducers } from "redux";
import userLoginReducer from "./userLoginReducer";

const allReducers = combineReducers({
    isLogged: userLoginReducer
});


export default allReducers;