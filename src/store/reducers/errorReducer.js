import { fromJS } from 'immutable';
import { THROW_ERROR } from '../actionsTypes/actionError';

const ErrorProblem = fromJS({
  error: false,
  messageError: '',
});

export default function errors(state = ErrorProblem, action) {
  switch (action.type) {
    case THROW_ERROR:
      break;
    default:
      break;
  }
  return state;
}
