import {
  SAVE_INPUT,
  CLOSE_MODAL,
  OPEN_MODAL,
  SEARCH_ENTITIES,
} from '../actionsTypes/actionsGeneral';

export default function saveInput(name, value) {
  return {
    type: SAVE_INPUT,
    name,
    value,
  };
}
export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}
export function openModal(type) {
  return {
    type: OPEN_MODAL,
    payload: type,
  }
}
export function searchEntities(query) {
  return {
    type: SEARCH_ENTITIES,
    payload: {
      query,
    }
  }
}
