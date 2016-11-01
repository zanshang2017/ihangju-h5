/*
 *
 * MyPage actions
 *
 */

import {
  DEFAULT_ACTION,
    LOAD_USER_CENTER_DATA,
    LOAD_USER_CENTER_DATA_SUCCESS,
    LOAD_USER_CENTER_DATA_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadUserCenterData() {
    return {
        type: LOAD_USER_CENTER_DATA
    };
}

export function loadUserCenterDataSuccess(data) {
    return {
        type: LOAD_USER_CENTER_DATA_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function loadUserCenterDataError(error = null) {
    return {
        type: LOAD_USER_CENTER_DATA_ERROR,
        payload: {
            error: error
        }
    };
}




