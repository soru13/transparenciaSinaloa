import { fromJS } from 'immutable';
import { SAVE_INPUT } from '../actionsTypes/actionsGeneral';
import CITAS from '../actionsTypes/actionList';
import { PATIENTS, SPECIALIST, PATIENT } from '../actionsTypes/actionList';
import { CLOSE_MODAL } from '../actionsTypes/actionsGeneral';

const generalInit = fromJS({
  inputs: {},
  list: [],
  especialistas: [],
  pacientes: [],
  paciente: {
    id: null,
    start_date: '',
    end_date: '',
    patient: '',
    event_type: '',
    usuario_registro: '',
    patient_uri: '',
    event_type_uri: '',
  }
});

export default function general(state = generalInit, action) {
  switch (action.type) {
    case SAVE_INPUT: {
      const input = state.setIn(['inputs', action.name], action.value);
      return state.merge(input);
    }
    case CITAS: {
      return state.setIn(['list'], fromJS(action.payload));
    }
    case PATIENTS: {
      return state.setIn(['pacientes'], fromJS(action.payload));
    }
    case PATIENT: {
      return state.setIn(['paciente'], fromJS(action.payload));
    }
    case SPECIALIST: {
      return state.setIn(['especialistas'], fromJS(action.payload));
    }
    case CLOSE_MODAL: {
      return state.setIn(['inputs'], fromJS(generalInit.get('inputs'))).setIn(['paciente'], fromJS(generalInit.get('paciente')));
    }
    default: {
      break;
    }
  }
  return state;
}
