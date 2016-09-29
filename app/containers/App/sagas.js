import {take, takeLatest, call, put, select} from 'redux-saga/effects';
import {
    LOAD_USER_INFO,
    UPDATE_USER_INFO,

    LOGOUT,
} from './constants';

import {
    loadUserInfoSuccess,
    loadUserInfoError,
    updateUserInfoSuccess,
    updateUserInfoError,
    logoutSuccess,
    logoutError,
} from './actions';

import {
    USER_INFO_API,
    DEVICE_TOKEN_API,
    LOGOUT_API,
} from '../../apis.js';

import {
    locStorage
} from 'utils/util';

import request from 'utils/request';

export default [
    getUserInfo,
    postUserInfo,
    logout,
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

export function* postUserInfo() {

    let action = null;

    while (action = yield take(UPDATE_USER_INFO)) {

        console.log('postUserInfo', action.payload.data);

        let url = USER_INFO_API;
        let data = action.payload.data || null;
        let body = '';

        if (data) {
            for (let k in data) {
                if (data.hasOwnProperty(k)) {
                    body += `${k}=${data[k]}`;
                }
            }
        }

        const ret = yield call(request, url, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (ret.err === undefined || ret.err === null) {
            yield put(updateUserInfoSuccess(action.payload.data));
        } else {
            console.log(ret.err.response); // eslint-disable-line no-console
            yield put(updateUserInfoError(ret.err));
        }

    }

}


export function* logout() {

    let action = null;

    while (action = yield take(LOGOUT)) {
        console.log('logout');

        let url = LOGOUT_API;

        const ret = yield call(request, url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        locStorage.removeItem('userInfo'); //清空用户信息
        yield put(logoutSuccess());

        if (ret.err === undefined || ret.err === null) {

            //清空用户信息
            if (ret.data.code === 'ok') {

            }
        } else {
            console.log(ret.err.response); // eslint-disable-line no-console
            yield put(logoutError(ret.err));
        }

    }

}