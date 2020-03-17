import { RECIVE_QUESTIONS } from '../actions/questions';
import { ADD_QUESTION, ADD_ANSWER } from '../actions/shared';

export function questions(state = {}, action) {
  switch (action.type) {
    case RECIVE_QUESTIONS:
      return action.questions;
    case ADD_QUESTION:
      return { ...state, [action.question.id]: action.question };
    case ADD_ANSWER:
      return {
        ...state,
        [action.data.qid]: {
          ...state[action.data.qid],
          [action.data.answer]: {
            ...state[action.data.qid][action.data.answer],
            votes: state[action.data.qid][action.data.answer].votes.concat([
              action.data.authedUser
            ])
          }
        }
      };
    default:
      return state;
  }
}
