/*
 *
 * CommentsPage actions
 *
 */

import {
    DEFAULT_ACTION,
    LOAD_COMMENTS_DATA,
    LOAD_COMMENTS_DATA_SUCCESS,
    LOAD_COMMENTS_DATA_ERROR,

    SEND_COMMENTS_DATA,
    SEND_COMMENTS_DATA_SUCCESS,
    SEND_COMMENTS_DATA_ERROR,

    SET_COMMENTS_DATA_STATUS,

    CHANGE_PLACEHOLDER,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadCommentsData(id, page = 0) {
    return {
        type: LOAD_COMMENTS_DATA,
        payload: {
            id: id,
            page: page,
        }
    };
}

export function loadCommentsDataSuccess(data, page) {
    return {
        type: LOAD_COMMENTS_DATA_SUCCESS,
        payload: {
            data: data,
            page: page,
        }
    };
}

export function loadCommentsDataError(error) {
    return {
        type: LOAD_COMMENTS_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function sendCommentsData(replyData) {
    return {
        type: SEND_COMMENTS_DATA,
        payload: {
            replyData: replyData
        }
    };
}

export function sendCommentsDataSuccess(data, replyData) {
    // 利用回传的replyData为依据插入回复数据
    return {
        type: SEND_COMMENTS_DATA_SUCCESS,
        payload: {
            data: data,
            replyData: replyData,
        }
    };
}

export function sendCommentsDataError(error) {
    return {
        type: SEND_COMMENTS_DATA_ERROR,
        payload: {
            error: error
        }
    };
}


export function setCommentsDataStatus(data) {
    var payload = {};

    if (typeof data.page === 'number') {
        payload.page = data.page;
    }

    if (typeof data.loading === 'boolean') {
        payload.loading = data.loading;
    }

    if (typeof data.isLast === 'boolean') {
        payload.isLast = data.isLast;
    }

    return {
        type: SET_COMMENTS_DATA_STATUS,
        payload: payload
    };
}

export function changePlaceholder(placeholder) {
    return {
        type: CHANGE_PLACEHOLDER,
        payload: {
            placeholder: placeholder
        }
    }
}




