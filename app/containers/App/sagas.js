import {take, takeLatest, call, put, select} from 'redux-saga/effects';
import {
    LOAD_USER_INFO
} from './constants';

import {
    loadUserInfoSuccess,
    loadUserInfoError,
} from './actions';

import {
    USER_INFO_API,
} from '../../apis.js';

import {
    locStorage
} from 'utils/util';

import request from 'utils/request';

export default [
    getUserInfo
];

export function* getUserInfo() {

    let action = null;

    while (action = yield take(LOAD_USER_INFO)) {

        console.log('getUserInfo');

        let url = USER_INFO_API;

        const ret = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (ret.err === undefined || ret.err === null) {

            //用户信息写入localStorage
            if (ret.data.result.id) {
                locStorage.set('userInfo', JSON.stringify(ret.data.result));
            }

            yield put(loadUserInfoSuccess(ret.data.result));
        } else {
            console.log(ret.err.response); // eslint-disable-line no-console
            yield put(loadUserInfoError(ret.err));
        }

    }

}

