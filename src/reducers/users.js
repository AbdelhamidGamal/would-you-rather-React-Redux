import { RECIVE_USERS } from '../actions/users';
import { ADD_QUESTION, ADD_ANSWER } from '../actions/shared';

export function users(state = {}, action) {
  switch (action.type) {
    case RECIVE_USERS:
      return action.users;
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([
            action.question.id
          ])
        }
      };
    case ADD_ANSWER:
      return {
        ...state,
        [action.data.authedUser]: {
          ...state[action.data.authedUser],
          answers: {
            ...state[action.data.authedUser].answers,
            [action.data.qid]: action.data.answer
          }
        }
      };
    default:
      return state;
  }
}
