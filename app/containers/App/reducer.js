/*
 * Reducer只关心数据，根据action.type和action.payload设置state
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {fromJS} from 'immutable';

import {
    locStorage
} from 'utils/util';

import {
    SHOW_NAV,
    HIDE_NAV,
    SET_CUR_PAGE,
    LOAD_LOCAL_STORAGE_USER_INFO,

    LOAD_USER_INFO,
    LOAD_USER_INFO_SUCCESS,

    UPDATE_USER_INFO,
    UPDATE_USER_INFO_SUCCESS,

    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,

} from './constants.js'

// global的初始state
const initialState = fromJS({
    loading: false, //加载信息
    error: false, //全局错误
    userInfo: { //三方登录后通过user/me获取的用户信息
        pushConfig: {}
    },
    showNav: true, //显示导航
    curPage: '', //当前页面
});

function globalReducer(state = initialState, action = {}) {

    let data = null;
    let _state = null;
    let _userInfo = null;

    console.log('action.type:' + action.type);

    switch (action.type) {
        case SHOW_NAV:
            return state.set('showNav', true);

        case HIDE_NAV:
            return state.set('showNav', false);

        case SET_CUR_PAGE:
            return state.set('curPage', action.payload.pageName);

        case LOAD_LOCAL_STORAGE_USER_INFO:
            try {
                _userInfo = JSON.parse(locStorage.get('userInfo'));
            } catch (e) {
                console.error(e);
            }

            if (_userInfo) {
                return state.set('userInfo', fromJS(_userInfo));
            }

            return state;

        case LOAD_USER_INFO:
            return state;

        case LOAD_USER_INFO_SUCCESS:
            return state.set('userInfo', fromJS(action.payload.data));

        case UPDATE_USER_INFO:
            return state;

        case UPDATE_USER_INFO_SUCCESS:

            data = action.payload.data || null;

            _userInfo = JSON.parse(locStorage.get('userInfo')) || {};

            _state = state;

            if (data) {
                for (let k in data) {
                    if (k.endsWith('Push')) {
                        let v = data[k];
                        _state = _state.setIn(['userInfo', 'pushConfig', k], v);
                        _userInfo['pushConfig'][k] = v;
                    } else {
                        _state = state.setIn(['userInfo', k], data[k]);
                        _userInfo[k] = data[k];
                    }
                }

                locStorage.set('userInfo', JSON.stringify(_userInfo));
                return _state;
            }

            return state;

        case LOGOUT:
            return state;

        case LOGOUT_SUCCESS:
            return state.set('userInfo', false);

        case LOGOUT_ERROR:
            return state;

        default:
            return state;
    }
}

export default globalReducer;


