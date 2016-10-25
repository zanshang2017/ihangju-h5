/*
 *
 * DialoguePage actions
 *
 */

import {
    DEFAULT_ACTION,
    LOAD_DIALOGUE_DATA,
    LOAD_DIALOGUE_DATA_SUCCESS,
    LOAD_DIALOGUE_DATA_ERROR,

    SEND_DIALOGUE_DATA,
    SEND_DIALOGUE_DATA_SUCCESS,
    SEND_DIALOGUE_DATA_ERROR,

    GET_LETTERGROUP_ID,
    GET_LETTERGROUP_ID_SUCCESS,
    GET_LETTERGROUP_ID_ERROR,

    SET_DIALOGUE_DATA_STATUS,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadDialogueData(id, page = 0) {
    return {
        type: LOAD_DIALOGUE_DATA,
        payload: {
            id: id,
            page: page,
        }
    };
}

export function loadDialogueDataSuccess(data, page) {
    return {
        type: LOAD_DIALOGUE_DATA_SUCCESS,
        payload: {
            data: data,
            page: page,
        }
    };
}

export function loadDialogueDataError(error) {
    return {
        type: LOAD_DIALOGUE_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function sendDialogueData(letterGroupId, dialogueData) {
    return {
        type: SEND_DIALOGUE_DATA,
        payload: {
            letterGroupId: letterGroupId,
            dialogueData: dialogueData
        }
    };
}

export function sendDialogueDataSuccess(dialogueData) {
    // 利用回传的dialogueData为依据插入回复数据
    return {
        type: SEND_DIALOGUE_DATA_SUCCESS,
        payload: {
            dialogueData: dialogueData,
        }
    };
}

export function getLetterGroupId(userId) {
    return {
        type: GET_LETTERGROUP_ID,
        payload: {
            userId: userId,
        }
    };
}

export function getLetterGroupIdSuccess(letterGroupId) {
    return {
        type: GET_LETTERGROUP_ID_SUCCESS,
        payload: {
            letterGroupId: letterGroupId,
        }
    };
}

export function getLetterGroupIdError(error) {
    return {
        type: GET_LETTERGROUP_ID_ERROR,
        payload: {
            error: error,
        }
    };
}


export function sendDialogueDataError(error) {
    return {
        type: SEND_DIALOGUE_DATA_ERROR,
        payload: {
            error: error
        }
    };
}


export function setDialogueDataStatus(data) {
    var payload = {};

    if (typeof data.page === 'number') {
        payload.page = data.page;
    }

    if (typeof data.loading === 'boolean') {
        payload.loading = data.loading;
    }

    if (typeof data.isLast === 'boolean') {
        payload.isLast = data.isLast;
    }

    return {
        type: SET_DIALOGUE_DATA_STATUS,
        payload: payload
    };
}


