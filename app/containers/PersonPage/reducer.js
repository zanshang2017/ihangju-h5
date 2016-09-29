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
} from './constants';

const initialState = fromJS({
    personInfo: false,
});

function PersonPageReducer(state = initialState, action = {}) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_PERSON_DATA:
            return state;

        case LOAD_PERSON_DATA_SUCCESS:
            return state.set('personInfo', action.payload.data);

        case LOAD_PERSON_DATA_ERROR:
            return state;

        default:
            return state;
    }
}

export default PersonPageReducer;
