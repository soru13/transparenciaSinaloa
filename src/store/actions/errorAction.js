import { THROW_ERROR } from '../actionsTypes/actionError';

export function fetchError(Error) {
  return {
    type: THROW_ERROR,
    payload: Error,
  };
}
