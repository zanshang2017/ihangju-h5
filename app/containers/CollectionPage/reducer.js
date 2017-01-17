/*
 *
 * CollectionPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    DEFAULT_ACTION,
    LOAD_COLLECTION_DATA,
    LOAD_COLLECTION_DATA_SUCCESS,
    LOAD_COLLECTION_DATA_ERROR,

    SET_COLLECTION_DATA_STATUS,
    RESET_STATE,

    SAVE_VIEWSTATE,
} from './constants';

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

const initialState = fromJS({
    collectionProjs: fromJS({
        data: false,
        loading: false,
        page: 0,
        isLast: false
    }),

    viewState: fromJS({
        scrollTop: 0
    }),
});

function CollectionPageReducer(state = initialState, action = {}) {

    var data = null,
        page = null,
        _state = null;


    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_COLLECTION_DATA:
            return state.setIn(['collectionProjs', 'loading'], true);

        case LOAD_COLLECTION_DATA_SUCCESS:

            data = action.payload.data;
            page = action.payload.page;

            if (page > 0) {
                let _concated = state.getIn(['collectionProjs', 'data']).concat(data);
                state = state.setIn(['collectionProjs', 'data'], _concated);
            } else {
                state = state.setIn(['collectionProjs', 'data'], data);
            }

            if(data && data.length === 0) {
                state = state.setIn(['collectionProjs', 'isLast'], true);
            }

            return state.setIn(['collectionProjs', 'loading'], false).setIn(['collectionProjs', 'page'], page);

        case LOAD_COLLECTION_DATA_ERROR:
            return state.setIn(['collectionProjs', 'loading'], false);

        case SET_COLLECTION_DATA_STATUS:
            var data = action.payload;

            if (typeof data.page === 'number' && data.page >= 0) {
                state = state.setIn(['collectionProjs', 'page'], data.page);
            }

            if (typeof data.loading !== 'undefined' && typeof data.loading === 'boolean') {
                state = state.setIn(['collectionProjs', 'loading'], data.loading);
            }

            if (typeof data.isLast !== 'undefined' && typeof data.isLast === 'boolean') {
                state = state.setIn(['collectionProjs', 'isLast'], data.isLast);
            }

            return state;

        case LOGOUT_SUCCESS:
            return initialState;

        case RESET_STATE:
            return initialState;

        case SAVE_VIEWSTATE:
            return state.set('viewState', fromJS(action.payload.viewState));

        default:
            return state;
    }
}

export default CollectionPageReducer;
