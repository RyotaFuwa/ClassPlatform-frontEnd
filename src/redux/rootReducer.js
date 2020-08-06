import {combineReducers} from "redux";

import userReducers from "./user/user.reducers";
import codingReducers from "./coding/coding.reducers";

export default combineReducers({
  user: userReducers,
  coding: codingReducers,
})
