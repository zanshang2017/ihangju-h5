/*
 *
 * AgreementDetailPage actions
 *
 */

import {
    DEFAULT_ACTION,

    LOAD_AGREEMENTS_DATA,
    LOAD_AGREEMENTS_DATA_SUCCESS,
    LOAD_AGREEMENTS_DATA_ERROR,

    SIGN_AGREEMENTS,
    SIGN_AGREEMENTS_SUCCESS,
    SIGN_AGREEMENTS_ERROR,

    SET_AGREEMENTS_DATA_STATUS,

    RESET_STATE,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadAgreementsData(userId) {
    return {
        type: LOAD_AGREEMENTS_DATA,
        payload: {
            userId
        }
    };
}

export function loadAgreementsDataSuccess(data, page) {
    return {
        type: LOAD_AGREEMENTS_DATA_SUCCESS,
        payload: {
            data: data,
            page: page
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

export function signAgreement(agreementId, isAgree = true, userId = null) {
    return {
        type: SIGN_AGREEMENTS,
        payload: {
            agreementId,
            isAgree,
            userId
        }
    };
}

export function signAgreementSuccess(agreementId, isAgree = true, userId = null) {
    return {
        type: SIGN_AGREEMENTS_SUCCESS,
        payload: {
            agreementId,
            isAgree,
            userId
        }
    };
}

export function signAgreementError(error) {
    return {
        type: SIGN_AGREEMENTS_ERROR,
        payload: {
            error
        }
    };
}


export function setAgreementsDataStatus(data) {
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
        type: SET_AGREEMENTS_DATA_STATUS,
        payload: payload
    };
}

export function resetState() {
    return {
        type: RESET_STATE,
    };
}


