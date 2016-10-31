import {take, takeLatest, call, put, select} from 'redux-saga/effects';
import {
    LOAD_USER_INFO,
    UPDATE_USER_INFO,

    LOGOUT,
    DISPATCH_ORIGIN,
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
    LOGOUT_API,
    THIRDPARTY_LOGOUT_URL,
    DEVICETOKEN_API,
} from 'apis.js';

import {
    locStorage
} from 'utils/util';

import request from 'utils/request';

import loginSignals from 'containers/LoginPage/signals';

export default [
    getUserInfo,
    postUserInfo,
    logout,
];

import bridge from 'utils/bridge';

export function* getUserInfo() {

    let action = null;

    while (action = yield take(LOAD_USER_INFO)) {
        console.log('getUserInfo', action);

        // let url = USER_INFO_API + '?r=' + Math.random();
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

            if (DISPATCH_ORIGIN.LOGIN === action.dispatchOrigin) {
                loginSignals.loginSuccess.dispatch(ret.data.result);
                putDevicetoken();
            }

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
                    body += `${k.toLowerCase()}=${data[k]}&`;  //参数全小写!
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

        deleteDevicetoken();

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

        if (ret.err === undefined || ret.err === null) {

            yield put(logoutSuccess());

            //通知第三方清除登录信息
            if (ret.data.code === 'ok') {
                const thirdPartyRet = yield call(request, THIRDPARTY_LOGOUT_URL, {
                    method: 'DELETE',
                    // credentials: 'include'
                });

                if (!(thirdPartyRet.err === undefined || thirdPartyRet.err === null)) {
                    yield put(logoutError(thirdPartyRet.err));
                }
            }
        } else {
            console.log(ret.err.response); // eslint-disable-line no-console
            yield put(logoutError(ret.err));
        }

    }

}

/**
 * 发送要注册的token
 * @param token
 */
function putDevicetoken() {

    bridge.device.token = bridge.device.token || locStorage.get('devicetoken');
    if (!bridge.device.token) {
        console.warn('无devicetoken,无法接收推送');
        return;
    }

    request(DEVICETOKEN_API, {
        method: "PUT",
        body: `token=${bridge.device.token}&os=${bridge.device.type || ''}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-Version': 'v1.1'
        },
        credentials: 'include'
    }).then(function (ret) {

    }, function (error) {

    });
}

/**
 * 删除注册的token
 */
function deleteDevicetoken() {

    bridge.device.token = bridge.device.token || locStorage.get('devicetoken');
    if (!bridge.device.token) {
        console.warn('无devicetoken');
        return;
    }

    request(DEVICETOKEN_API, {
        method: "DELETE",
        body: `token=${bridge.device.token}&os=${bridge.device.type || ''}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-Version': 'v1.1'
        },
        credentials: 'include'
    }).then(function (ret) {

    }, function (error) {

    });
}

