/*
 *
 * TagDetailPage actions
 *
 */

import {
    DEFAULT_ACTION,

    LOAD_TAG_LIST,
    LOAD_TAG_LIST_SUCCESS,
    LOAD_TAG_LIST_ERROR,

    EDIT_TAG,
    EDIT_TAG_SUCCESS,
    EDIT_TAG_ERROR,

    LOAD_TAG_RECOMMENDATION_LIST,
    LOAD_TAG_RECOMMENDATION_LIST_SUCCESS,
    LOAD_TAG_RECOMMENDATION_LIST_ERROR,

    SUB_TAG,
    SUB_TAG_SUCCESS,
    SUB_TAG_ERROR,

    CANCEL_SUB_TAG,
    CANCEL_SUB_TAG_SUCCESS,
    CANCEL_SUB_TAG_ERROR,

    RECOMMENDATION_PROJECT,
    RECOMMENDATION_PROJECT_SUCCESS,
    RECOMMENDATION_PROJECT_ERROR,

    SET_PROJECT_LIST_STATUS,
    SET_RECOMMENDATION_LIST_STATUS,
    SET_EDITING,
    SET_DETAIL,

    RESET_ALL_STATE,

} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}


export function loadTagList(id, page = 0, size = 10) {
    return {
        type: LOAD_TAG_LIST,
        payload: {
            id: id,
            page: page,
            size: size,
        }
    };
}

export function loadTagListSuccess(data, page = 0) {
    return {
        type: LOAD_TAG_LIST_SUCCESS,
        payload: {
            data: data,
            page: page,
        }
    };
}

export function loadTagListError(error) {
    return {
        type: LOAD_TAG_LIST_ERROR,
        payload: {
            error: error
        }
    };
}

export function editTag(id, desc, image) {
    return {
        type: EDIT_TAG,
        payload: {
            desc: desc,
            image: image,
            id: id
        }
    };
}

export function editTagSuccess(data) {
    return {
        type: EDIT_TAG_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function editTagError(err) {
    return {
        type: EDIT_TAG_ERROR,
        payload: {
            err: err
        }
    };
}


export function loadTagRecommendationList(id, page = 0, size = 10) {
    return {
        type: LOAD_TAG_RECOMMENDATION_LIST,
        payload: {
            id: id,
            page: page,
            size: size,
        }
    };
}

export function loadTagRecommendationListSuccess(data, page = 0) {
    return {
        type: LOAD_TAG_RECOMMENDATION_LIST_SUCCESS,
        payload: {
            data: data,
            page: page,
        }
    };
}

export function loadTagRecommendationListError(error) {
    return {
        type: LOAD_TAG_RECOMMENDATION_LIST_ERROR,
        payload: {
            error: error
        }
    };
}

export function subTag(id) {
    return {
        type: SUB_TAG,
        payload: {
            id: id
        }
    }
}

export function subTagSuccess() {
    return {
        type: SUB_TAG_SUCCESS,
    }
}

export function subTagError() {
    return {
        type: SUB_TAG_ERROR,
    }
}

export function cancelSubTag(id) {
    return {
        type: CANCEL_SUB_TAG,
        payload: {
            id: id
        }
    }
}

export function cancelSubTagSuccess() {
    return {
        type: CANCEL_SUB_TAG_SUCCESS,
    }
}

export function cancelSubTagError() {
    return {
        type: CANCEL_SUB_TAG_ERROR,
    }
}

export function recommendationProject(id, tagID, isRemove=false) {
    return {
        type: RECOMMENDATION_PROJECT,
        payload: {
            id,
            tagID,
            isRemove
        }
    }
}

export function recommendationProjectSuccess(id, isRemove) {
    return {
        type: RECOMMENDATION_PROJECT_SUCCESS,
        payload: {
            id: id,
            isRemove: isRemove,
        }
    }
}

export function recommendationProjectError() {
    return {
        type: RECOMMENDATION_PROJECT_ERROR,
    }
}

export function setProjectListStatus(data) {
    var payload = {};

    console.log('project status:', data);

    if (typeof data.page === 'number') {
        payload.page = data.page;
    }

    if (typeof data.isLast === 'boolean') {
        payload.isLast = data.isLast;
    }

    if (typeof data.loading === 'boolean') {
        payload.loading = data.loading;
    }

    return {
        type: SET_PROJECT_LIST_STATUS,
        payload: payload
    };
}



export function setRecommendationListStatus(data) {
    var payload = {};

    if (typeof data.page === 'number') {
        payload.page = data.page;
    }

    if (typeof data.isLast === 'boolean') {
        payload.isLast = data.isLast;
    }

    if (typeof data.loading === 'boolean') {
        payload.loading = data.loading;
    }

    return {
        type: SET_RECOMMENDATION_LIST_STATUS,
        payload: payload
    };
}


/**
 * @param {boolean} value
 * @returns {{type, playload: {value: *}}}
 */
export function setEditing(value) {
    return {
        type: SET_EDITING,
        payload: {
            value: value
        }
    }
}

/**
 * @param {boolean} value
 * @returns {{type, playload: {value: *}}}
 */
export function setDetail(data={}) {
    return {
        type: SET_DETAIL,
        payload: {
            data: data
        }
    }
}


export function resetAllState() {
    return {
        type: RESET_ALL_STATE,
    }
}


