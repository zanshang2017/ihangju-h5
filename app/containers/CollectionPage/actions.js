/*
 *
 * CollectionPage actions
 *
 */

import {
    DEFAULT_ACTION,
    LOAD_COLLECTION_DATA,
    LOAD_COLLECTION_DATA_SUCCESS,
    LOAD_COLLECTION_DATA_ERROR,

    SET_COLLECTION_DATA_STATUS,
    RESET_STATE,

    SAVE_VIEWSTATE,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadCollectionData(id, page = 0) {
    return {
        type: LOAD_COLLECTION_DATA,
        payload: {
            id: id,
            page: page,
        }
    };
}

export function loadCollectionDataSuccess(data, page) {
    return {
        type: LOAD_COLLECTION_DATA_SUCCESS,
        payload: {
            data: data,
            page: page
        }
    };
}

export function loadCollectionDataError(error) {
    return {
        type: LOAD_COLLECTION_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function setCollectionDataStatus(data) {
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
        type: SET_COLLECTION_DATA_STATUS,
        payload: payload
    };
}

export function resetState() {
    return {
        type: RESET_STATE,
    };
}

export function setViewState(viewState) {
    return {
        type: SAVE_VIEWSTATE,
        payload: {
            viewState
        }
    }
}

