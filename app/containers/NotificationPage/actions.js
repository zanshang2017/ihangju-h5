/*
 *
 * NotificationPage actions
 *
 */

import {
    DEFAULT_ACTION,

    LOAD_COMMENT_LIST,
    LOAD_COMMENT_LIST_SUCCESS,
    LOAD_COMMENT_LIST_ERROR,

    LOAD_MESSAGE_LIST,
    LOAD_MESSAGE_LIST_SUCCESS,
    LOAD_MESSAGE_LIST_ERROR,

    SET_COMMENT_LIST_STATUS,
    SET_MESSAGE_LIST_STATUS,

    RESET_STATES,

} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}


export function loadCommentList(page = 0, size = 10) {
    return {
        type: LOAD_COMMENT_LIST,
        payload: {
            page: page,
            size: size,
        }
    };
}

export function loadCommentListSuccess(data, page = 0) {
    return {
        type: LOAD_COMMENT_LIST_SUCCESS,
        payload: {
            data: data,
            page: page,
        }
    };
}

export function loadCommentListError(error) {
    return {
        type: LOAD_COMMENT_LIST_ERROR,
        payload: {
            error: error
        }
    };
}

export function loadMessageList(page = 0, size = 10) {
    return {
        type: LOAD_MESSAGE_LIST,
        payload: {
            page: page,
            size: size,
        }
    };
}

export function loadMessageListSuccess(data, page = 0) {
    return {
        type: LOAD_MESSAGE_LIST_SUCCESS,
        payload: {
            data: data,
            page: page,
        }
    };
}

export function loadMessageListError(error) {
    return {
        type: LOAD_MESSAGE_LIST_ERROR,
        payload: {
            error: error
        }
    };
}

export function setCommentListStatus(data) {
    var payload = {};

    console.log('project status:', data);

    if (typeof data.page === 'number') {
        payload.page = data.page;
    }

    if (typeof data.isLast === 'boolean') {
        payload.isLast = data.isLast;
    }

    if (typeof data.loading === 'boolean') {
        payload.loading = data.loading;
    }

    return {
        type: SET_COMMENT_LIST_STATUS,
        payload: payload
    };
}


export function setMessageListStatus(data) {
    var payload = {};

    if (typeof data.page === 'number') {
        payload.page = data.page;
    }

    if (typeof data.isLast === 'boolean') {
        payload.isLast = data.isLast;
    }

    if (typeof data.loading === 'boolean') {
        payload.loading = data.loading;
    }

    return {
        type: SET_MESSAGE_LIST_STATUS,
        payload: payload
    };
}

export function resetStates() {
    return {
        type: RESET_STATES
    }
}



