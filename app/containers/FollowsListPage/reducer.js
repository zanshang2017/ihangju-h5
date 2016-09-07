/*
 *
 * FollowsListPage reducer
 *
 */

import {fromJS, Map} from 'immutable';

import {
    DEFAULT_ACTION,
    LOAD_LIST_DATA,
    LOAD_LIST_DATA_SUCCESS,
    LOAD_LIST_DATA_ERROR,

    SET_LIST_DATA_STATUS,

    SET_FOLLOW_USER,
    SET_FOLLOW_USER_SUCCESS,
    SET_FOLLOW_USER_ERROR,

} from './constants';

const initialState = fromJS({
    followsList: fromJS({
        data: false,
        loading: false,
        page: 0,
        isLast: false
    }),
});

function FollowsListPageReducer(state = initialState, action = {}) {

    var data = null,
        page = null,
        _state = null;

    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_LIST_DATA:
            return state.setIn(['followsList', 'loading'], true);

        case LOAD_LIST_DATA_SUCCESS:

            data = action.payload.data;
            page = action.payload.page;

            if (page > 0) {
                // let _merged = state.set('myFollowLoading', false).get('myFollowData').concat(fromJS(data.result))
                let _concated = state.getIn(['followsList', 'data']).concat(fromJS(data));
                state = state.setIn(['followsList', 'data'], _concated);
            } else {
                state = state.setIn(['followsList', 'data'], fromJS(data));
            }

            if (data && data.length === 0) {
                state = state.setIn(['followsList', 'isLast'], true);
            }

            return state.setIn(['followsList', 'loading'], false).setIn(['followsList', 'page'], page);

        case LOAD_LIST_DATA_ERROR:
            return state.setIn(['followsList', 'loading'], false);

        case SET_FOLLOW_USER:
            return state;

        case SET_FOLLOW_USER_SUCCESS:
            var id = action.payload.id;
            var isToFollow = action.payload.isToFollow;
            var $$data = state.getIn(['followsList', 'data']);

            var data = $$data.toJS();

            data.forEach(function (d) {
                if (d.id === id) {
                    d.follow = isToFollow;
                    return false;
                }
            });

            return state.setIn(['followsList', 'data'], fromJS(data));

        case SET_FOLLOW_USER_ERROR:
            return state;

        case SET_LIST_DATA_STATUS:
            var data = action.payload;

            if (typeof data.page === 'number' && data.page >= 0) {
                state = state.setIn(['followsList', 'page'], data.page);
            }

            if (typeof data.loading !== 'undefined' && typeof data.loading === 'boolean') {
                state = state.setIn(['followsList', 'loading'], data.loading);
            }

            if (typeof data.isLast !== 'undefined' && typeof data.isLast === 'boolean') {
                state = state.setIn(['followsList', 'isLast'], data.isLast);
            }

            return state;

        default:
            return state;
    }
}

export default FollowsListPageReducer;
