/*
 *
 * MyPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    DEFAULT_ACTION,
    LOAD_USER_CENTER_DATA,
    LOAD_USER_CENTER_DATA_SUCCESS,
    LOAD_USER_CENTER_DATA_ERROR,
} from './constants';

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

const initialState = fromJS({
    userCenterInfo: false,
});

function myPageReducer(state = initialState, action = {}) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_USER_CENTER_DATA:
            return state;

        case LOAD_USER_CENTER_DATA_SUCCESS:
            return state.set('userCenterInfo', action.payload.data);

        case LOAD_USER_CENTER_DATA_ERROR:
            return state;

        case LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}

export default myPageReducer;
