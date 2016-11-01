import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_LIST_DATA,
} from './constants';

import {
    loadListDataSuccess,
    loadListDataError,
} from './actions'

import {
    USER_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getListData,
];

export function* getListData() {

    let action = null;
    while (action = yield take(LOAD_LIST_DATA)) {

        let id = action.payload.id;
        let page = action.payload.page || 0;
        let size = 10;
        let url = USER_API + `${id}/fans?page=${page}&size=${size}`;

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
                yield put(loadListDataSuccess(lists.data.result, page));
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(loadListDataError(lists.err));
            }
        }
    }
}
