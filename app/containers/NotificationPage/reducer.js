/*
 *
 * NotificationPage reducer
 *
 */

import {fromJS} from 'immutable';
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

} from './constants';

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

const initialState = fromJS({
    commentList: false,
    messageList: false,

    commentListStatus: fromJS({
        page: 0,
        isLast: false,
        loading: false,
    }),

    messageListStatus: fromJS({
        page: 0,
        isLast: false,
        loading: false,
    })
});

function notificationPageReducer(state = initialState, action = {}) {

    let data = null,
        page = 0;

    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_COMMENT_LIST:
            console.log('loading=true')
            return state.setIn(['commentListStatus', 'loading'], true);

        case LOAD_COMMENT_LIST_SUCCESS:

            console.log('loading=false')

            data = action.payload.data;
            page = action.payload.page;

            if (data.code === 'ok' && data.result) {
                let res = data.result;

                if (page > 0) {
                    let _merged = state.get('commentList').concat(fromJS(res));
                    let _state = state.set('commentList', _merged);
                    return _state.setIn(['commentListStatus', 'loading'], false);
                } else {
                    let _state = state.set('commentList', fromJS(res));
                    return _state.setIn(['commentListStatus', 'loading'], false);
                }
            }

            return state;

        case LOAD_COMMENT_LIST_ERROR:
            console.log('loading=false');
            return state.setIn(['commentListStatus', 'loading'], false);


        case LOAD_MESSAGE_LIST:
            console.log('loading=true');
            return state.setIn(['messageListStatus', 'loading'], true);

        case LOAD_MESSAGE_LIST_SUCCESS:

            console.log('loading=false');

            data = action.payload.data;
            page = action.payload.page;

            if (data.code === 'ok' && data.result) {
                let res = data.result;

                if (page > 0) {
                    let _merged = state.get('messageList').concat(fromJS(res));
                    let _state = state.set('messageList', _merged);
                    return _state.setIn(['messageListStatus', 'loading'], false);
                } else {
                    let _state = state.set('messageList', fromJS(res));
                    return _state.setIn(['messageListStatus', 'loading'], false);
                }
            }

            return state;

        case LOAD_MESSAGE_LIST_ERROR:
            console.log('loading=false');
            return state.setIn(['messageListStatus', 'loading'], false);

        case SET_COMMENT_LIST_STATUS:
            data = action.payload;

            if (typeof data.page === 'number' && data.page >= 0) {
                state = state.setIn(['commentListStatus', 'page'], data.page);
            }

            if (typeof data.isLast !== 'undefined' && typeof data.isLast === 'boolean') {
                state = state.setIn(['commentListStatus', 'isLast'], data.isLast);
            }

            if (typeof data.loading === 'boolean') {
                state = state.setIn(['commentListStatus', 'loading'], data.loading);
            }

            return state;

        case SET_MESSAGE_LIST_STATUS:
            data = action.payload;

            if (typeof data.page === 'number' && data.page >= 0) {
                state = state.setIn(['messageListStatus', 'page'], data.page);
            }

            if (typeof data.isLast !== 'undefined' && typeof data.isLast === 'boolean') {
                state = state.setIn(['messageListStatus', 'isLast'], data.isLast);
            }

            if (typeof data.loading === 'boolean') {
                state = state.setIn(['messageListStatus', 'loading'], data.loading);
            }

            return state;

        case LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}

export default notificationPageReducer;
