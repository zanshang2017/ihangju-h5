/*
 * Demo Actions
 *
 * 增加新的APP action:
 * 1) 导入常量;
 * 2) 像下面这样增加action creator
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    DEFAULT_ACTION,
    DEL_ITEM,
    LOADLIST,
    LOADLIST_SUCCESS,
    LOADLIST_ERROR
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function delItem(index) {
    return {
        type: DEL_ITEM,
        payload: {
            index: index
        }
    };
}

/**
 * @returns {{type: LOADLIST}}
 */
export function loadList() {
    return {
        type: LOADLIST
    };
}

/**
 * 列表成功加载
 * @param list
 * @returns {{type: LOADLIST, payload: {list: *}}}
 */
export function loadListSuccess(list) {
    return {
        type: LOADLIST_SUCCESS,
        payload: {
            list: list
        }
    };
}

/**
 * 列表加载失败
 * @param error
 * @returns {{type: LOADLIST, payload: {error: *}}}
 */
export function loadListError(error) {
    return {
        type: LOADLIST_ERROR,
        payload: {
            error: error
        }
    };
}
