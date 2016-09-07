/*
 *
 * MyTagPage actions
 *
 */

import {
    DEFAULT_ACTION,

    LOAD_TAG_DATA,
    LOAD_TAG_DATA_SUCCESS,
    LOAD_TAG_DATA_ERROR,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadTagData(id) {
    return {
        type: LOAD_TAG_DATA,
        payload: {
            id: id
        }
    };
}

export function loadTagDataSuccess(data) {
    return {
        type: LOAD_TAG_DATA_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function loadTagDataError(error) {
    return {
        type: LOAD_TAG_DATA_ERROR,
        payload: {
            error: error
        }
    };
}




