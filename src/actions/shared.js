import { reciveQuestions } from './questions';
import { reciveUsers } from './users';
import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

function addAnswer(data) {
  return {
    type: ADD_ANSWER,
    data
  };
}

export function handleReciveData() {
  return dispatch => {
    getInitialData().then(res => {
      dispatch(reciveQuestions(res.questions));
      dispatch(reciveUsers(res.users));
    });
  };
}

export function handleCreateNewQuestion(question) {
  return dispatch => {
    saveQuestion(question).then(question => dispatch(addQuestion(question)));
  };
}

export function handleAddAnswer({ authedUser, qid, answer }) {
  return dispatch => {
    saveQuestionAnswer({ authedUser, qid, answer }).then(res =>
      dispatch(addAnswer({ authedUser, qid, answer }))
    );
  };
}
