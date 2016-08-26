import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_USER_DATA,
} from './constants';

import {
    loadUserDataSuccess,
    loadUserDataError,
} from './actions'

import {
    USER_PROFILE_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getUserData,
];

export function* getUserData() {

    let action = yield take(LOAD_USER_DATA);
    let id = action.payload.id || '';

    if (id) {
        let url = USER_PROFILE_API + id;
        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if ((lists.err === undefined || lists.err === null) && (lists.data.result && lists.data.code === 'ok')) {
            yield put(loadUserDataSuccess(lists.data.result));
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadUserDataError(lists.err));
        }
    } else {
        yield put(loadUserDataError(new Error('缺少用户id')));
    }
}
