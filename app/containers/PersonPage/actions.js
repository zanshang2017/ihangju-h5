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

    SET_FOLLOW_USER,
    SET_FOLLOW_USER_SUCCESS,
    SET_FOLLOW_USER_ERROR,

    RESET_STATE,

} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function resetState() {
    return {
        type: RESET_STATE,
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

export function setFollowUser(id, isToFollow) {
    return {
        type: SET_FOLLOW_USER,
        payload: {
            id: id,
            isToFollow: isToFollow
        }
    };
}

export function setFollowUserSuccess(id, isToFollow) {
    return {
        type: SET_FOLLOW_USER_SUCCESS,
        payload: {
            id: id,
            isToFollow: isToFollow
        }
    };
}

export function setFollowUserError(error) {
    return {
        type: SET_FOLLOW_USER_ERROR,
        payload: {
            error: error
        }
    };
}



