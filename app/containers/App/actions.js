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
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,

    LOAD_USER_INFO,
    LOAD_USER_INFO_SUCCESS,
    LOAD_USER_INFO_ERROR,

    UPDATE_USER_INFO,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_ERROR,

    SET_CUR_PAGE,
    LOAD_LOCAL_STORAGE_USER_INFO,

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

export function setCurPage(pageName) {
    return {
        type: SET_CUR_PAGE,
        payload: {
            pageName: pageName
        }
    }
}

export function loadLocalStorageUserInfo() {
    return {
        type: LOAD_LOCAL_STORAGE_USER_INFO,
    };
}

export function loginSuccess(userToken) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            userToken: userToken
        }
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function logoutError() {
    return {
        type: LOGOUT_ERROR
    }
}

export function loadUserInfo(dispatchOrigin) {
    let data = {
        type: LOAD_USER_INFO,
        dispatchOrigin: dispatchOrigin,
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


export function updateUserInfo(data = {}) {
    // debugLog('updateUserInfo:' + Object.values(data));
    return {
        type: UPDATE_USER_INFO,
        payload: {
            data: data
        }
    };
}

export function updateUserInfoSuccess(data = null) {
    return {
        type: UPDATE_USER_INFO_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function updateUserInfoError(error) {
    return {
        type: UPDATE_USER_INFO_ERROR,
        payload: {
            error: error
        }
    };
}


