import {
  setError,
  unsetError,
  startLoading,
  finishLoading
} from '../../actions/ui';

import types from '../../types/types';

describe("Pruebas en las acciones de UI", () => {

  test("Deberia crearse el error", () => {
    const action = setError("Error");

    expect ( action ).toEqual({
      type: types.uiSetError,
      payload: "Error"
    });
  });

  test("Deberia eliminar el error", () => {
    const action = unsetError();

    expect ( action ).toEqual({
      type: types.uiRemoveError
    });
  });

  test("Deberia cargar el loading", () => {
    const action = startLoading();

    expect ( action ).toEqual({
      type: types.uiStartLoading
    });
  });

  test("Deberia terminar el loading", () => {
    const action = finishLoading();

    expect ( action ).toEqual({
      type: types.uiFinishLoading
    });
  });

});
