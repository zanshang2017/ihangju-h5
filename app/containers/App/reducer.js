/*
 * Reducer只关心数据，根据action.type和action.payload设置state
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
    SHOW_NAV,
    HIDE_NAV
} from './constants.js'

// global的初始state
const initialState = fromJS({
    loading: false, //加载信息
    error: false, //全局错误
    currentUser: false, //用户信息
    showNav: true //显示导航
});

function globalReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SHOW_NAV:
            return state.set('showNav', true);

        case HIDE_NAV:
            return state.set('showNav', false);

        default:
            return state;
    }
}

export default globalReducer;


