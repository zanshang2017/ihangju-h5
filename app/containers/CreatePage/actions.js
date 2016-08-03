/*
 *
 * CreatePage actions
 *
 */

import {
    DEFAULT_ACTION,

    CHANGE_TAB,

    LOAD_NOTES_DATA,
    LOAD_NOTES_DATA_SUCCESS,
    LOAD_NOTES_DATA_ERROR,

    LOAD_NOTE,
    LOAD_NOTE_SUCCESS,
    LOAD_NOTE_ERROR,

    SAVE_NOTE,
    SAVE_NOTE_SUCCESS,
    SAVE_NOTE_ERROR,

    UPDATE_NOTE_EDIT_CONTENT,

} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

export function changeTab(id) {
    return {
        type: CHANGE_TAB,
        payload: {
            id: id
        }
    };
}

export function loadNotesData(page = 0, size = 10) {
    return {
        type: LOAD_NOTES_DATA,
        payload: {
            page: page,
            size: size
        }
    };
}

export function loadNotesDataSuccess(data) {
    return {
        type: LOAD_NOTES_DATA_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function loadNotesDataError(error) {
    return {
        type: LOAD_NOTES_DATA_ERROR,
        payload: {
            error: error
        }
    };
}

export function loadNote(id) {
    return {
        type: LOAD_NOTE,
        payload: {
            id: id
        }
    };
}

export function loadNoteSuccess(data) {
    return {
        type: LOAD_NOTE_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function loadNoteError(error) {
    return {
        type: LOAD_NOTE_ERROR,
        payload: {
            error: error
        }
    };
}

export function updateEditNoteContent(content) {
    return {
        type: UPDATE_NOTE_EDIT_CONTENT,
        payload: {
            content: content
        }
    };
}

export function saveNote(id, content) {
    return {
        type: SAVE_NOTE,
        payload: {
            id: id,
            content: content
        }
    };
}


