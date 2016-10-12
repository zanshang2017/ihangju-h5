/*
 *
 * PersonPage reducer
 *
 */

import {fromJS} from 'immutable';

import {
    DEFAULT_ACTION,
    LOAD_PERSON_DATA,
    LOAD_PERSON_DATA_SUCCESS,
    LOAD_PERSON_DATA_ERROR,
    SET_FOLLOW_USER,
    SET_FOLLOW_USER_SUCCESS,
    SET_FOLLOW_USER_ERROR,

    RESET_STATE,
} from './constants';

const initialState = fromJS({
    personInfo: false,
});

function PersonPageReducer(state = initialState, action = {}) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case RESET_STATE:
            return state.set('personInfo', false);

        case LOAD_PERSON_DATA:
            return state;

        case LOAD_PERSON_DATA_SUCCESS:
            return state.set('personInfo', fromJS(action.payload.data));

        case LOAD_PERSON_DATA_ERROR:
            return state;

        case SET_FOLLOW_USER:
            return state;

        case SET_FOLLOW_USER_SUCCESS:
            let _follow = !state.getIn(['personInfo', 'follow']);
            return state.setIn(['personInfo', 'follow'], _follow);

        default:
            return state;
    }
}

export default PersonPageReducer;
