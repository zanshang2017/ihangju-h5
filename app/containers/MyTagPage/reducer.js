/*
 *
 * MyTagPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    DEFAULT_ACTION,
    LOAD_TAG_DATA,
    LOAD_TAG_DATA_SUCCESS,
    LOAD_TAG_DATA_ERROR,
} from './constants';

const initialState = fromJS({
    tags: false,
});

function myTagPageReducer(state = initialState, action = {}) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_TAG_DATA:
            return state;

        case LOAD_TAG_DATA_SUCCESS:
            return state.set('tags', action.payload.data);

        case LOAD_TAG_DATA_ERROR:
            return state;

        default:
            return state;
    }
}

export default myTagPageReducer;
