import { combineReducers } from "redux";
import { authReducer, errorReducer } from "./redusers/index"; 

const appReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return appReducer(state, action);
};


export default rootReducer;
