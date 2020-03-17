export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUTUSER';

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    user
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
