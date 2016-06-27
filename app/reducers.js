/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'containers/App/reducer';

/*
 * routeReducer
 * 将locationChange合成到state中，需要react-route-redux
 */

const routeInitialState = fromJS({
    locationBeforeTransitions: null,
});

/**
 * 合并入全局state
 */
function routeReducer(state = routeInitialState, action = null) {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return state.merge({
                locationBeforeTransitions: action.payload,
            });
        default:
            return state;
    }
}

/**
 * 包含异步reducer加载的主reducer
 */
export default function createReducer(asyncReducers) {
    return combineReducers({
        route: routeReducer,
        global: globalReducer,
        ...asyncReducers,
    });
}
