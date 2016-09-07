import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_TAG_DATA,
} from './constants';

import {
    loadTagDataSuccess,
    loadTagDataError,
} from './actions'

import {
    USER_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getTagData,
];

export function* getTagData() {

    let action = yield take(LOAD_TAG_DATA);

    let url = USER_API + action.payload.id + '/management/tag';

    const lists = yield call(request, url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-Version': 'v1.1'
        },
        credentials: 'include'
    });

    if ((lists.err === undefined || lists.err === null) && (lists.data.result && lists.data.code === 'ok')) {
        yield put(loadTagDataSuccess(lists.data.result));
    } else {
        console.log(lists.err.response); // eslint-disable-line no-console
        yield put(loadTagDataError(lists.err));
    }
}
