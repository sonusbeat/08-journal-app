import types from '../types/types';

export function setError( error ) {
  return {
    type: types.uiSetError,
    payload: error
  };
};

export function unsetError() {
  return {
    type: types.uiRemoveError
  };
};

export function startLoading() {
  return {
    type: types.uiStartLoading
  };
}

export function finishLoading() {
  return {
    type: types.uiFinishLoading
  };
}