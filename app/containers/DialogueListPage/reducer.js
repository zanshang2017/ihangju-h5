/*
 *
 * DialogueListPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    DEFAULT_ACTION,
    LOAD_DIALOGUE_LIST_DATA,
    LOAD_DIALOGUE_LIST_DATA_SUCCESS,
    LOAD_DIALOGUE_LIST_DATA_ERROR,

    SET_DIALOGUE_LIST_DATA_STATUS,
} from './constants';

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

const initialState = fromJS({
    lists: fromJS({
        data: false,
        loading: false
    }),
});

function DialogueListPageReducer(state = initialState, action = {}) {

    var data = null,
        page = null,
        _state = null;


    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_DIALOGUE_LIST_DATA:
            return state.setIn(['lists', 'loading'], true);

        case LOAD_DIALOGUE_LIST_DATA_SUCCESS:
            data = action.payload.data;

            state = state.setIn(['lists', 'data'], data);

            return state.setIn(['lists', 'loading'], false);

        case LOAD_DIALOGUE_LIST_DATA_ERROR:
            return state.setIn(['lists', 'loading'], false);

        case SET_DIALOGUE_LIST_DATA_STATUS:
            var data = action.payload;

            if (typeof data.loading !== 'undefined' && typeof data.loading === 'boolean') {
                state = state.setIn(['lists', 'loading'], data.loading);
            }

            return state;

        case LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}

export default DialogueListPageReducer;
