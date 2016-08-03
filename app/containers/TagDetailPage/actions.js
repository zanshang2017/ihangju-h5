/*
 *
 * TagDetailPage actions
 *
 */

import {
    DEFAULT_ACTION,

    LOAD_RECOMMENDATION_DATA,
    LOAD_RECOMMENDATION_DATA_SUCCESS,
    LOAD_RECOMMENDATION_DATA_ERROR,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
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