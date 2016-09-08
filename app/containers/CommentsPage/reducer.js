/*
 *
 * CommentsPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    DEFAULT_ACTION,
    LOAD_COMMENTS_DATA,
    LOAD_COMMENTS_DATA_SUCCESS,
    LOAD_COMMENTS_DATA_ERROR,

    SET_COMMENTS_DATA_STATUS,
} from './constants';

const initialState = fromJS({
    comments: fromJS({
        data: false,
        loading: false,
    }),
});

function CommentsPageReducer(state = initialState, action = {}) {

    var data = null,
        page = null,
        _state = null;


    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_COMMENTS_DATA:
            return state.setIn(['comments', 'loading'], true);

        case LOAD_COMMENTS_DATA_SUCCESS:

            data = action.payload.data;
            page = action.payload.page;

            state = state.setIn(['comments', 'data'], data);

            return state.setIn(['comments', 'loading'], false);

        case LOAD_COMMENTS_DATA_ERROR:
            return state.setIn(['comments', 'loading'], false);

        case SET_COMMENTS_DATA_STATUS:
            var data = action.payload;

            if (typeof data.loading !== 'undefined' && typeof data.loading === 'boolean') {
                state = state.setIn(['comments', 'loading'], data.loading);
            }

            return state;

        default:
            return state;
    }
}

export default CommentsPageReducer;
