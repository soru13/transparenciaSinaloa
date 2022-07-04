import { fromJS } from 'immutable';
import { OPEN_MODAL , CLOSE_MODAL } from '../actionsTypes/actionsGeneral';

const initialState = fromJS({
  visibility: false,
  action: null,
})

function modal(state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return state.merge({
        visibility: true,
        action: action.payload,
      })
    case CLOSE_MODAL:
      return state.merge(initialState);
    default:
      return state
  }
}

export default modal;
