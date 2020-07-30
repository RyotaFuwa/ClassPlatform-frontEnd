import {combineReducers} from "redux";

import userReducers from "./user/user.reducers";

export default combineReducers({
  user: userReducers,
})
