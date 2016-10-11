/*
 *
 * FollowRecommendationPage actions
 *
 */

import {
    DEFAULT_ACTION,

    LOAD_RECOMMENDATION_DATA,
    LOAD_RECOMMENDATION_DATA_SUCCESS,
    LOAD_RECOMMENDATION_DATA_ERROR,

    CHANGE_CHOICE_TYPE,

    SETTINT_FOLLOW,
    SETTINT_FOLLOW_SUCCESS,
    SETTINT_FOLLOW_ERROR,

    TOGGLE_SELECT,

    CHOICE_TYPE,

} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadRecommendationData() {
    return {
        type: LOAD_RECOMMENDATION_DATA
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

export function changeChoiceType(choiceType) {
    return {
        type: CHANGE_CHOICE_TYPE,
        payload: {
            type: choiceType
        }
    };
}

export function toggleSelect(id, type) {
    return {
        type: TOGGLE_SELECT,
        payload: {
            type: type,
            id: id,
        }
    }
}

export function settingFollow(tags, users) {
    return {
        type: SETTINT_FOLLOW,
        payload: {
            tags: tags,
            users: users,
        }
    };
}






