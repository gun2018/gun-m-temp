import { combineReducers } from "redux";
import auth from "./auth";
import test from "./test";

const rootReducer = combineReducers({ auth, test });

export default rootReducer;
