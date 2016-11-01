import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_USER_CENTER_DATA,
    LOAD_USER_CENTER_DATA_ERROR,
    LOAD_USER_CENTER_DATA_SUCCESS,
} from './constants';

import {
    loadUserCenterDataSuccess,
    loadUserCenterDataError,
} from './actions'

import {
    USER_CENTER_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getUserCenterData,
];

export function* getUserCenterData() {
    while (yield take(LOAD_USER_CENTER_DATA)) {
        let url = USER_CENTER_API;
        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        try {
            if ((lists && (lists.err === undefined || lists.err === null)) && (lists.data.result && lists.data.code === 'ok')) {
                yield put(loadUserCenterDataSuccess(lists.data.result));
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(loadUserCenterDataError(null));
            }
        } catch (e) {
        }

    }
}
