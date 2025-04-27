import { authActions } from "../actions/index";

const initialState = {
  roles: "",
  loggedIn: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        roles: action.payload.roles,
        loggedIn: true,
      };
    case authActions.LOGIN_FAILURE:
      return {
        ...state,
        roles: "",
        loggedIn: false,
      };
    default:
      return state;
  }
}; 
