/*
 *
 * PersonPage reducer
 *
 */

import {fromJS} from 'immutable';

import {
    DEFAULT_ACTION,
    LOAD_USER_DATA,
    LOAD_USER_DATA_SUCCESS,
    LOAD_USER_DATA_ERROR,
} from './constants';

const initialState = fromJS({
    userInfo: false,
});

function PersonPageReducer(state = initialState, action = {}) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_USER_DATA:
            return state;

        case LOAD_USER_DATA_SUCCESS:
            return state.set('userInfo', action.payload.data);

        case LOAD_USER_DATA_ERROR:
            return state;

        default:
            return state;
    }
}

export default PersonPageReducer;
