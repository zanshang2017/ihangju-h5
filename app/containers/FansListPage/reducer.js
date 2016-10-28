/*
 *
 * FansListPage reducer
 *
 */

import {fromJS} from 'immutable';

import {
    DEFAULT_ACTION,
    LOAD_LIST_DATA,
    LOAD_LIST_DATA_SUCCESS,
    LOAD_LIST_DATA_ERROR,

    SET_LIST_DATA_STATUS,
} from './constants';

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

const initialState = fromJS({
    fansList: fromJS({
        data: false,
        loading: false,
        page: 0,
        isLast: false
    }),
});

function FansListPageReducer(state = initialState, action = {}) {

    var data = null,
        page = null,
        _state = null;

    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_LIST_DATA:
            return state.setIn(['fansList', 'loading'], true);

        case LOAD_LIST_DATA_SUCCESS:

            data = action.payload.data;
            page = action.payload.page;

            if (page > 0) {
                let _concated = state.getIn(['fansList', 'data']).concat(data);
                state = state.setIn(['fansList', 'data'], _concated);
            } else {
                state = state.setIn(['fansList', 'data'], data);
            }

            if (data && data.length === 0) {
                state = state.setIn(['fansList', 'isLast'], true);
            }

            return state.setIn(['fansList', 'loading'], false).setIn(['fansList', 'page'], page);

        case LOAD_LIST_DATA_ERROR:
            return state.setIn(['fansList', 'loading'], false);

        case SET_LIST_DATA_STATUS:
            var data = action.payload;

            if (typeof data.page === 'number' && data.page >= 0) {
                state = state.setIn(['fansList', 'page'], data.page);
            }

            if (typeof data.loading !== 'undefined' && typeof data.loading === 'boolean') {
                state = state.setIn(['fansList', 'loading'], data.loading);
            }

            if (typeof data.isLast !== 'undefined' && typeof data.isLast === 'boolean') {
                state = state.setIn(['fansList', 'isLast'], data.isLast);
            }

            return state;

        case LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}

export default FansListPageReducer;
