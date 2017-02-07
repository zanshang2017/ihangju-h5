/*
 *
 * AgreementDetailPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    DEFAULT_ACTION,
    LOAD_AGREEMENTS_DATA,
    LOAD_AGREEMENTS_DATA_SUCCESS,
    LOAD_AGREEMENTS_DATA_ERROR,

    SIGN_AGREEMENTS,
    SIGN_AGREEMENTS_SUCCESS,
    SIGN_AGREEMENTS_ERROR,

    SET_AGREEMENTS_DATA_STATUS,
    RESET_STATE,
} from './constants';

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

import Toast from 'antd-mobile/lib/toast';

const initialState = fromJS({
    agreements: fromJS({
        data: false,
        loading: false,
        // page: 0,
        isLast: false
    }),
});

function AgreementDetailPageReducer(state = initialState, action = {}) {

    var data = null,
        agreements = null,
        page = null,
        _state = null,
        isAgree = null;


    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_AGREEMENTS_DATA:
            return state.setIn(['agreements', 'loading'], true);

        case LOAD_AGREEMENTS_DATA_SUCCESS:

            data = action.payload.data;
            // page = action.payload.page;

            // if (page > 0) {
            //     let _concated = state.getIn(['agreements', 'data']).concat(data);
            //     state = state.setIn(['agreements', 'data'], _concated);
            // } else {
            state = state.setIn(['agreements', 'data'], data);
            // }

            // if(data && data.length === 0) {
            //     state = state.setIn(['agreements', 'isLast'], true);
            // }

            try {
                Toast.hide();
            }catch(e){}

            return state.setIn(['agreements', 'loading'], false).setIn(['agreements', 'page'], page);

        case LOAD_AGREEMENTS_DATA_ERROR:
            return state.setIn(['agreements', 'loading'], false);

        case SIGN_AGREEMENTS:

            // debugger;
            //找到对应协议信息,状态置为loading
            agreements = state.get('agreements').toJS();

            agreements.data.map(function (v) {
                if (v.agreementid == action.payload.agreementId) {
                    v.loading = true;
                }
            });

            return state.set('agreements', fromJS(agreements));

        case SIGN_AGREEMENTS_SUCCESS:

            //找到对应协议信息,状态置为loading
            agreements = state.get('agreements').toJS();
            isAgree = action.payload.isAgree;

            agreements.data.map(function (v) {
                if (v.agreementid == action.payload.agreementId) {
                    if (isAgree) {
                        v.status = 'authorize_affirmance';
                    } else {
                        v.status = 'authorize_refusal';
                    }
                    delete v.loading;
                }
            });

            return state.set('agreements', fromJS(agreements));

        case SIGN_AGREEMENTS_ERROR:
            try {
                Toast.hide();
            }catch(e){}

            return state;

        case SET_AGREEMENTS_DATA_STATUS:
            var data = action.payload;

            if (typeof data.page === 'number' && data.page >= 0) {
                state = state.setIn(['agreements', 'page'], data.page);
            }

            if (typeof data.loading !== 'undefined' && typeof data.loading === 'boolean') {
                state = state.setIn(['agreements', 'loading'], data.loading);
            }

            if (typeof data.isLast !== 'undefined' && typeof data.isLast === 'boolean') {
                state = state.setIn(['agreements', 'isLast'], data.isLast);
            }

            return state;

        case LOGOUT_SUCCESS:
            return initialState;

        case RESET_STATE:
            return initialState;

        default:
            return state;
    }
}

export default AgreementDetailPageReducer;
