/*
 *
 * AgreementsPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    DEFAULT_ACTION,
    LOAD_AGREEMENTS_DATA,
    LOAD_AGREEMENTS_DATA_SUCCESS,
    LOAD_AGREEMENTS_DATA_ERROR,
    SET_AGREEMENTS_DATA_STATUS,
    RESET_STATE,
} from './constants';

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

const initialState = fromJS({
    agreenments: fromJS({
        data: false,
        loading: false,
        // page: 0,
        isLast: false
    }),
});

function AgreementsPageReducer(state = initialState, action = {}) {

    var data = null,
        page = null,
        _state = null;


    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_AGREEMENTS_DATA:
            return state.setIn(['agreements', 'loading'], true);

        case LOAD_AGREEMENTS_DATA_SUCCESS:

            data = action.payload.data;
            page = action.payload.page;

            if (page > 0) {
                let _concated = state.getIn(['agreements', 'data']).concat(data);
                state = state.setIn(['agreements', 'data'], _concated);
            } else {
                state = state.setIn(['agreements', 'data'], data);
            }

            if(data && data.length === 0) {
                state = state.setIn(['agreements', 'isLast'], true);
            }

            return state.setIn(['agreements', 'loading'], false).setIn(['agreements', 'page'], page);

        case LOAD_AGREEMENTS_DATA_ERROR:
            return state.setIn(['agreements', 'loading'], false);

        case LOGOUT_SUCCESS:
            return initialState;

        case RESET_STATE:
            return initialState;

        default:
            return state;
    }
}

export default AgreementsPageReducer;
