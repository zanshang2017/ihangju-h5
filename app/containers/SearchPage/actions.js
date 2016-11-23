/*
 *
 * SearchPage actions
 *
 */

import {
    DEFAULT_ACTION,
    CHANGE_TAB,
    SET_STATUS,

    REMOVE_ALL_HISTORY,
    ADD_HISTORY,
    INIT_HISTORY,

    LOAD_SEARCH_RESULT,
    LOAD_SEARCH_RESULT_SUCCESS,
    LOAD_SEARCH_RESULT_ERROR,

    SET_SEARCH_KEYWORD,
    RESET_ALL_STATE,

} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

export function changeTag(key) {
    return {
        type: CHANGE_TAB,
        payload: {
            key
        }
    }
}

export function removeAllHistory() {
    return {
        type: REMOVE_ALL_HISTORY,
    }
}

export function addHistory(keyword = '') {
    return {
        type: ADD_HISTORY,
        payload: {
            keyword
        }
    }
}


export function initHistory(keywords = []) {
    return {
        type: INIT_HISTORY,
        payload: {
            keywords
        }
    }
}


export function loadSearchResult(keyword, page = 0) {
    return {
        type: LOAD_SEARCH_RESULT,
        payload: {
            keyword,
            page
        }
    };
}

export function loadSearchResultSuccess(data, page) {
    return {
        type: LOAD_SEARCH_RESULT_SUCCESS,
        payload: {
            data,
            page
        }
    };
}

export function loadSearchResultError(error) {
    return {
        type: LOAD_SEARCH_RESULT_ERROR,
        payload: {
            error: error
        }
    };
}

export function setStatus(status = {}) {
    return {
        type: SET_STATUS,
        payload: {
            status
        }
    }
}

export function setSearchKeyword(keyword = '') {
    return {
        type: SET_SEARCH_KEYWORD,
        payload: {
            keyword
        }
    }
}

export function resetAllState() {
    return {
        type: RESET_ALL_STATE
    }
}