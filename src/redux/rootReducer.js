import {combineReducers} from "redux";

import userReducers from "./user/user.reducers";
import codingReducers from "./coding/coding.reducers";
import classReducers from "./class/class.reducers";

export default combineReducers({
  user: userReducers,
  coding: codingReducers,
  class: classReducers,
})
