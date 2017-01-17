/*
 *
 * FoundPage actions
 *
 */

import {
    DEFAULT_ACTION,

    LOAD_DISCOVERIES_DATA,
    LOAD_DISCOVERIES_DATA_SUCCESS,
    LOAD_DISCOVERIES_DATA_ERROR,

    LOAD_RECOMMENDATION_DATA,
    LOAD_RECOMMENDATION_DATA_SUCCESS,
    LOAD_RECOMMENDATION_DATA_ERROR,

    SAVE_VIEWSTATE,

} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

export function loadDiscoveriesData(page = 0, size = 10) {
    return {
        type: LOAD_DISCOVERIES_DATA,
        payload: {
            page: page,
            size: size
        }
    };
}

export function loadDiscoveriesDataSuccess(data) {
    return {
        type: LOAD_DISCOVERIES_DATA_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function loadDiscoveriesDataError(error) {
    return {
        type: LOAD_DISCOVERIES_DATA_ERROR,
        payload: {
            error: error
        }
    };
}


export function loadRecommendationData(page = 0, size = 10) {
    return {
        type: LOAD_RECOMMENDATION_DATA,
        payload: {
            page: page,
            size: size
        }
    };
}

export function loadRecommendationDataSuccess(data) {
    return {
        type: LOAD_RECOMMENDATION_DATA_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function loadRecommendationDataError(error) {
    return {
        type: LOAD_RECOMMENDATION_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function setViewState(viewState) {
    return {
        type: SAVE_VIEWSTATE,
        payload: {
            viewState
        }
    }
}



