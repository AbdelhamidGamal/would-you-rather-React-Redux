import { LOGIN_USER, LOGOUT_USER } from '../actions/authedUser';

export function authedUser(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.user;
    case LOGOUT_USER:
      return '';
    default:
      return state;
  }
}
