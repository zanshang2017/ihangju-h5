/*
 * App Actions
 *
 * 增加新的APP action:
 * 1) 导入常量;
 * 2) 像下面这样增加action creator
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    SHOW_NAV,
    HIDE_NAV,
    LOGIN_SUCCESS,

    LOAD_USER_INFO,
    LOAD_USER_INFO_SUCCESS,
    LOAD_USER_INFO_ERROR,

} from './constants';

export function showNav() {
    return {
        type: SHOW_NAV
    }
}

export function hideNav() {
    return {
        type: HIDE_NAV
    }
}

export function loginSuccess(userToken) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            userToken: userToken
        }
    }
}

export function loadUserInfo() {
    let data = {
        type: LOAD_USER_INFO
    };

    return data;
}

export function loadUserInfoSuccess(data) {
    return {
        type: LOAD_USER_INFO_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function loadUserInfoError(error) {
    return {
        type: LOAD_USER_INFO_ERROR,
        payload: {
            error: error
        }
    };
}


