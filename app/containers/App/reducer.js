/*
 * Reducer只关心数据，根据action.type和action.payload设置state
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {fromJS} from 'immutable';

import {
    SHOW_NAV,
    HIDE_NAV,
    SET_CUR_PAGE,

    LOAD_USER_INFO,
    LOAD_USER_INFO_SUCCESS,

} from './constants.js'

// global的初始state
const initialState = fromJS({
    loading: false, //加载信息
    error: false, //全局错误
    userInfo: false, //三方登录后通过user/me获取的用户信息
    showNav: true, //显示导航
    curPage: '', //当前页面
});

function globalReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SHOW_NAV:
            return state.set('showNav', true);

        case HIDE_NAV:
            return state.set('showNav', false);

        case SET_CUR_PAGE:
            return state.set('curPage', action.payload.pageName);

        case LOAD_USER_INFO:
            return state;

        case LOAD_USER_INFO_SUCCESS:
            return state.set('userInfo', fromJS(action.payload.data));

        default:
            return state;
    }
}

export default globalReducer;


