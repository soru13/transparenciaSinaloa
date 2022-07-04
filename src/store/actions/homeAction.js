import IS_LOADING from '../actionsTypes/actionHome';
import CITAS from '../actionsTypes/actionList';
import { SPECIALIST, PATIENTS, PATIENT } from '../actionsTypes/actionList';
import { fetchError } from './errorAction';
import axios from 'axios';
import { closeModal } from './generalsAction';
export function Done(data) {
  return {
    type: CITAS,
    payload: data
  };
}
export function citas() {
  const urlGet = '/api/citas/';
  return (dispatch) => {
    axios.get(urlGet)
      .then(response => {
        dispatch(Done(response.data))
      })
      .catch(error => dispatch(fetchError(error)));
  };
}
export function DoneSpecialist(data) {
  return {
    type: SPECIALIST,
    payload: data
  };
}
export function getSpecialist() {
  const urlGet = '/api/especialidades/';
  return (dispatch) => {
    axios.get(urlGet)
      .then(response => {
        dispatch(DoneSpecialist(response.data))
      })
      .catch(error => dispatch(fetchError(error)));
  };
}
export function DonePatientlist(data) {
  return {
    type: PATIENTS,
    payload: data
  };
}
export function getPatientlist() {
  const urlGet = '/api/pacientes/';
  return (dispatch) => {
    axios.get(urlGet)
      .then(response => {
        dispatch(DonePatientlist(response.data))
      })
      .catch(error => dispatch(fetchError(error)));
  };
}
export function DonePatient(data) {
  return {
    type: PATIENT,
    payload: data
  };
}
export function getPatient(id) {
  const urlGet = `/api/citas/${id}`;
  return (dispatch) => {
    axios.get(urlGet)
      .then(response => {
        dispatch(DonePatient(response.data))
      })
      .catch(error => dispatch(fetchError(error)));
  };
}
export function newDateAppoinment(data, token) {
  // axios.defaults.headers.common['X-CSRFTOKEN'] = token;
  const headers = {"X-CSRFToken": token}
  return (dispatch) => {
    axios.post('/api/nueva_cita/', data, {headers: headers})
      .then(response => {
        dispatch(closeModal())
        dispatch(citas())
      })
      .catch(error => dispatch(fetchError(error)));
  };
}
export function editAppoinment(data, token, id) {
  const headers = {"X-CSRFToken": token}
  return (dispatch) => {
    axios.put(`/api/citas/${id}/`, data, {headers: headers})
      .then(response => {
        dispatch(closeModal())
        dispatch(citas())
      })
      .catch(error => dispatch(fetchError(error)));
  };
}
export function eliminarCita(token, id) {
  const headers = {"X-CSRFToken": token}
  return (dispatch) => {
    axios.delete(`/api/citas/${id}`,{headers: headers})
      .then(response => {
        dispatch(citas())
        dispatch(closeModal())
      })
      .catch(error => dispatch(fetchError(error)));
  };
}


export default function isLoading(value) {
  return {
    type: IS_LOADING,
    payload: {
      value,
    },
  };
}
