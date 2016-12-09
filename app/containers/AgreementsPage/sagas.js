import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_AGREEMENTS_DATA,
} from './constants';

import {
    loadAgreementsDataSuccess,
    loadAgreementsDataError
} from './actions'

import {
    AGREEMENTS_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getAgreementsData,
];

export function* getAgreementsData() {

    let action = null;
    while (action = yield take(LOAD_AGREEMENTS_DATA)) {

        // let id = action.payload.id;
        // let page = action.payload.page || 0;
        // let size = 10;
        let url = AGREEMENTS_API;

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
