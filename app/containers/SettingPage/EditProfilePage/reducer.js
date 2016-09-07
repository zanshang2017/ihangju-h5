/*
 *
 * EditProfilePage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    DEFAULT_ACTION,
    LOAD_USER_CENTER_DATA,
    LOAD_USER_CENTER_DATA_SUCCESS,
    LOAD_USER_CENTER_DATA_ERROR,
} from './constants';

const initialState = fromJS({
    userCenterInfo: false,
});

function myPageReducer(state = initialState, action = {}) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        default:
            return state;
    }
}

export default myPageReducer;
