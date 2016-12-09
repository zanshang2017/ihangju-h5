/*
 *
 * AgreementsPage actions
 *
 */

import {
    DEFAULT_ACTION,

    LOAD_AGREEMENTS_DATA,
    LOAD_AGREEMENTS_DATA_SUCCESS,
    LOAD_AGREEMENTS_DATA_ERROR,

    RESET_STATE,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadAgreementsData() {
    return {
        type: LOAD_AGREEMENTS_DATA,
    };
}

export function loadAgreementsDataSuccess(data) {
    return {
        type: LOAD_AGREEMENTS_DATA_SUCCESS,
        payload: {
            data: data,
            // page: page
        }
    };
}

export function loadAgreementsDataError(error) {
    return {
        type: LOAD_AGREEMENTS_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function resetState() {
    return {
        type: RESET_STATE,
    };
}


