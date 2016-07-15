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

