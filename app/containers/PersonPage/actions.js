/*
 *
 * PersonPage actions
 *
 */

import {
  DEFAULT_ACTION,
    LOAD_PERSON_DATA,
    LOAD_PERSON_DATA_SUCCESS,
    LOAD_PERSON_DATA_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadPersonData(id) {
    return {
        type: LOAD_PERSON_DATA,
        payload: {
            id: id,
        }
    };
}

export function loadPersonDataSuccess(data) {
    return {
        type: LOAD_PERSON_DATA_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function loadPersonDataError(error) {
    return {
        type: LOAD_PERSON_DATA_ERROR,
        payload: {
            error: error
        }
    };
}




