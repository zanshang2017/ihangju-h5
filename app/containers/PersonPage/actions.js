/*
 *
 * PersonPage actions
 *
 */

import {
  DEFAULT_ACTION,
    LOAD_USER_DATA,
    LOAD_USER_DATA_SUCCESS,
    LOAD_USER_DATA_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadUserData(id) {
    return {
        type: LOAD_USER_DATA,
        payload: {
            id: id,
        }
    };
}

export function loadUserDataSuccess(data) {
    return {
        type: LOAD_USER_DATA_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function loadUserDataError(error) {
    return {
        type: LOAD_USER_DATA_ERROR,
        payload: {
            error: error
        }
    };
}




