export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginSuccess = (roles) => ({
  type: LOGIN_SUCCESS,
  payload: {roles}
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});
