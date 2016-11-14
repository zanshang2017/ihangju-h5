/*
 *
 * CommentsPage reducer
 *
 */

import {
    fromJS,
} from 'immutable';

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

    RESET_STATES,
} from './constants';

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

const initialState = fromJS({
    comments: fromJS({
        data: false,
        page: 0,
        isLast: false,
        loading: false,
        sending: false,
    }),
    inputPlaceholder: '' //输入框占位符
});

function CommentsPageReducer(state = initialState, action = {}) {

    var data = null,
        page = null,
        replyData = null,
        _state = null;

    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_COMMENTS_DATA:
            return state.setIn(['comments', 'loading'], true);

        case LOAD_COMMENTS_DATA_SUCCESS:

            data = action.payload.data;
            page = action.payload.page;

            if (page > 0) {
                let _concated = state.getIn(['comments', 'data']).toJS().concat(data);
                state = state.setIn(['comments', 'data'], fromJS(_concated));
            } else {
                state = state.setIn(['comments', 'data'], fromJS(data));
            }

            if (data && data.length === 0) {
                state = state.setIn(['comments', 'isLast'], true);
            }

            return state.setIn(['comments', 'loading'], false).setIn(['comments', 'page'], page);

        case LOAD_COMMENTS_DATA_ERROR:
            return state.setIn(['comments', 'loading'], false);

        case SEND_COMMENTS_DATA:
            return state.setIn(['comments', 'sending'], true);

        case SEND_COMMENTS_DATA_SUCCESS:

            data = action.payload.data;
            replyData = action.payload.replyData;

            let insertedData = null;

            if(replyData.type) { // 回复
                insertedData = insertData(state.getIn(['comments', 'data']), replyData.parentid, data);
            } else { //评论
                insertedData = state.getIn(['comments', 'data']).unshift(data);
            }

            return state.setIn(['comments', 'data'], insertedData);

        case SEND_COMMENTS_DATA_ERROR:
            return state.setIn(['comments', 'sending'], false);

        case SET_COMMENTS_DATA_STATUS:
            var data = action.payload;

            if (typeof data.loading !== 'undefined' && typeof data.loading === 'boolean') {
                state = state.setIn(['comments', 'loading'], data.loading);
            }

            return state;

        case CHANGE_PLACEHOLDER:
            return state.set('inputPlaceholder', action.payload.placeholder);

        case LOGOUT_SUCCESS:
            return initialState;

        case RESET_STATES:
            return initialState;

        default:
            return state;
    }
}

/**
 * 将数据插入匹配的state节点
 *
 * @param originData
 * @param id
 * @param data
 */
function insertData(originData, id, data) {
    let found = false;
    originData = originData.toJS();

    for (let i = 0, l = originData.length; i < l; i++) {
        let item = originData[i];

        if (item.id == id) {
            item.answers.push(data);
            break;
        }

        if (item.answers.length > 0) {
            for (let ii = 0, ll = item.answers.length; ii < ll; ii++) {
                let _item = item.answers[ii];
                if (_item.id == id) {
                    found = true;
                    item.answers.push(data);
                    break;
                }
            }
        }

        if (found) {
            break;
        }
    }

    return fromJS(originData);
}


export default CommentsPageReducer;
