/*
 *
 * FansListPage actions
 *
 */

import {
    DEFAULT_ACTION,
    LOAD_LIST_DATA,
    LOAD_LIST_DATA_SUCCESS,
    LOAD_LIST_DATA_ERROR,

    SET_LIST_DATA_STATUS,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadListData(id, page = 0) {
    return {
        type: LOAD_LIST_DATA,
        payload: {
            id: id,
            page: page,
        }
    };
}

export function loadListDataSuccess(data, page) {
    return {
        type: LOAD_LIST_DATA_SUCCESS,
        payload: {
            data: data,
            page: page
        }
    };
}

export function loadListDataError(error) {
    return {
        type: LOAD_LIST_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function setListDataStatus(data) {
    var payload = {};

    if (typeof data.page === 'number') {
        payload.page = data.page;
    }

    if (typeof data.loading === 'boolean') {
        payload.loading = data.loading;
    }

    if (typeof data.isLast === 'boolean') {
        payload.isLast = data.isLast;
    }

    return {
        type: SET_LIST_DATA_STATUS,
        payload: payload
    };
}




