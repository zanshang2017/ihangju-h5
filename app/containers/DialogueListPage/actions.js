/*
 *
 * DialogueListPage actions
 *
 */

import {
    DEFAULT_ACTION,
    LOAD_DIALOGUE_LIST_DATA,
    LOAD_DIALOGUE_LIST_DATA_SUCCESS,
    LOAD_DIALOGUE_LIST_DATA_ERROR,

    SET_DIALOGUE_LIST_DATA_STATUS,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadDialogueListData(id) {
    return {
        type: LOAD_DIALOGUE_LIST_DATA,
        payload: {
            id: id,
        }
    };
}

export function loadDialogueListDataSuccess(data) {
    return {
        type: LOAD_DIALOGUE_LIST_DATA_SUCCESS,
        payload: {
            data: data,
        }
    };
}

export function loadDialogueListDataError(error) {
    return {
        type: LOAD_DIALOGUE_LIST_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function setDialogueListDataStatus(data) {
    var payload = {};

    if (typeof data.loading === 'boolean') {
        payload.loading = data.loading;
    }

    return {
        type: SET_DIALOGUE_LIST_DATA_STATUS,
        payload: payload
    };
}




