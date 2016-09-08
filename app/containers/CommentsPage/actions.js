/*
 *
 * CommentsPage actions
 *
 */

import {
    DEFAULT_ACTION,
    LOAD_COMMENTS_DATA,
    LOAD_COMMENTS_DATA_SUCCESS,
    LOAD_COMMENTS_DATA_ERROR,

    SET_COMMENTS_DATA_STATUS,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadCommentsData(id) {
    return {
        type: LOAD_COMMENTS_DATA,
        payload: {
            id: id,
        }
    };
}

export function loadCommentsDataSuccess(data) {
    return {
        type: LOAD_COMMENTS_DATA_SUCCESS,
        payload: {
            data: data,
        }
    };
}

export function loadCommentsDataError(error) {
    return {
        type: LOAD_COMMENTS_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function setCommentsDataStatus(data) {
    var payload = {};

    if (typeof data.loading === 'boolean') {
        payload.loading = data.loading;
    }

    return {
        type: SET_COMMENTS_DATA_STATUS,
        payload: payload
    };
}




