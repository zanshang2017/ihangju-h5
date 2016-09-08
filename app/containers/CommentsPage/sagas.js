import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_COMMENTS_DATA,
    LOAD_COMMENTS_DATA_ERROR,
    LOAD_COMMENTS_DATA_SUCCESS,
} from './constants';

import {
    loadCommentsDataSuccess,
    loadCommentsDataError,
} from './actions'

import {
    USER_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getCollectionData,
];

export function* getCollectionData() {

    let action = null;
    while (action = yield take(LOAD_COMMENTS_DATA)) {

        let id = action.payload.id;
        let page = action.payload.page || 0;
        let size = 10;
        let url = USER_API + `${id}/collection?page=${page}&size=${size}`;

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if ((lists.err === undefined || lists.err === null) && (lists.data.result && lists.data.code === 'ok')) {
            yield put(loadCommentsDataSuccess(lists.data.result, page));
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadCommentsDataError(lists.err));
        }
    }
}
