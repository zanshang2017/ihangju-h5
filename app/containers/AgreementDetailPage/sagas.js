import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_AGREEMENTS_DATA,
    SIGN_AGREEMENTS,
} from './constants';

import {
    loadAgreementsData,
    loadAgreementsDataSuccess,
    loadAgreementsDataError,

    signAgreementSuccess,
    signAgreementError,
} from './actions'

import {
    AGREEMENT_PROFILE_API,
    AGREEMENT_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getAgreementsData,
    signAgreement,
];

export function* getAgreementsData() {

    let action = null;
    while (action = yield take(LOAD_AGREEMENTS_DATA)) {

        let userId = action.payload.userId;
        // let page = action.payload.page || 0;
        // let size = 10;
        let url = AGREEMENT_PROFILE_API + `/${userId}`;

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists) {
            if ((lists.err === undefined || lists.err === null) && (lists.data.result && lists.data.code === 'ok')) {
                yield put(loadAgreementsDataSuccess(lists.data.result));
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(loadAgreementsDataError(lists.err));
            }
        }
    }
}

export function* signAgreement() {

    let action = null;
    while (action = yield take(SIGN_AGREEMENTS)) {

        let id = action.payload.agreementId;
        let isAgree = action.payload.isAgree;
        let userId = action.payload.userId;
        let url = AGREEMENT_API + `/${id}`;

        const lists = yield call(request, url, {
            method: isAgree ? 'PUT' : 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists) {
            if ((lists.err === undefined || lists.err === null) && (lists.data && lists.data.code === 'ok')) {
                yield put(signAgreementSuccess(id, isAgree));
                yield put(loadAgreementsData(userId));
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(signAgreementError(lists.err));

            }
        }
    }
}
