import { combineReducers } from 'redux-immutable';
import errors from './errorReducer';
import general from './generalReducer';
import isLoading from './isLoadingReducer';
import modal from './modalReducer';

const rootReducer = combineReducers({
  errors,
  general,
  isLoading,
  modal,
});

export default rootReducer;
