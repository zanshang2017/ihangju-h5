/*
 *
 * FollowPage actions
 *
 */

import {
    DEFAULT_ACTION,

    LOAD_MY_FOLLOW_DATA,
    LOAD_MY_FOLLOW_DATA_SUCCESS,
    LOAD_MY_FOLLOW_DATA_ERROR,

    LOAD_MY_FOLLOW_LIST_DATA,
    LOAD_MY_FOLLOW_LIST_DATA_SUCCESS,
    LOAD_MY_FOLLOW_LIST_DATA_ERROR,

    CHANGE_CURRENT_FOLLOW,

    SET_MY_FOLLOW_DATA_STATUS,
    SET_MY_FOLLOW_LIST_DATA_STATUS,

} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadMyFollowData(page = 0, size = 10, id = null, type = null) {

    let data = {
        type: LOAD_MY_FOLLOW_DATA,
        payload: {
            page: page,
            size: size
        }
    };

    if (id) {
        data.payload.id = id;
    }

    if (type) {
        data.payload.type = type;
    }

    return data;
}

export function loadMyFollowDataSuccess(data, page) {
    return {
        type: LOAD_MY_FOLLOW_DATA_SUCCESS,
        payload: {
            data: data,
            page: page
        }
    };
}

export function loadMyFollowDataError(error) {
    return {
        type: LOAD_MY_FOLLOW_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function loadMyFollowListData(page = 0, size = 10) {
    return {
        type: LOAD_MY_FOLLOW_LIST_DATA,
        payload: {
            page: page,
            size: size
        }
    };
}

export function loadMyFollowListDataSuccess(data, page) {
    return {
        type: LOAD_MY_FOLLOW_LIST_DATA_SUCCESS,
        payload: {
            data: data,
            page: page
        }
    };
}

export function loadMyFollowListDataError(error) {
    return {
        type: LOAD_MY_FOLLOW_LIST_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function changeCurrentFollow(data) {
    return {
        type: CHANGE_CURRENT_FOLLOW,
        payload: {
            id: data.id || -1,
            name: data.name || '全部关注',
            type: data.type || null
        }
    };
}

export function setMyFollowDataStatus(data) {
    var payload = {};

    if (typeof data.page === 'number') {
        payload.page = data.page;
    }

    if (typeof data.isLast === 'boolean') {
        payload.isLast = data.isLast;
    }

    return {
        type: SET_MY_FOLLOW_DATA_STATUS,
        payload: payload
    };
}

export function setMyFollowListDataStatus(data) {
    var payload = {};

    if (typeof data.page === 'number') {
        payload.page = data.page;
    }

    if (typeof data.isLast === 'boolean') {
        payload.isLast = data.isLast;
    }

    return {
        type: SET_MY_FOLLOW_LIST_DATA_STATUS,
        payload: payload
    };
}




