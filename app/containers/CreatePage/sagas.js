import {take, takeEvery, takeLatest, call, put, select} from 'redux-saga/effects';
import {
    LOAD_NOTES_DATA,
    LOAD_NOTE,
    SAVE_NOTE,
    DELETE_NOTE,
    IDENTIFY_AUTH,
} from 'containers/CreatePage/constants';

import {
    loadNotesData,
    loadNotesDataSuccess,
    loadNotesDataError,
    loadNoteSuccess,
    loadNoteError,
    saveNoteSuccess,
    saveNoteError,
    updateEditNoteContent,
    deleteNoteSuccess,
    deleteNoteError,
    identifyAuthSuccess,
    identifyAuthError,
} from 'containers/CreatePage/actions';

import {
    NOTE_LIST_API,
    NOTE_API,
    IDENTIFY_AUTH_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getNotesData,
    getNote,
    uploadNote,
    deleteNote,
    identifyAuth,
];

export function* getNotesData() {

    let action = null;

    while (action = yield take(LOAD_NOTES_DATA)) {

        let page = action.payload.page;
        let size = action.payload.size;

        let url = NOTE_LIST_API + `?page=${page}&size=${size}`;

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists) {
            if (lists.err === undefined || lists.err === null) {
                yield put(loadNotesDataSuccess(lists.data, page));
            } else {
                yield put(loadNotesDataError(lists.err));
            }
        }
    }
}

export function* getNote() {

    let action = null;

    while (action = yield take(LOAD_NOTE)) {
        console.log('getNote');

        let id = action.payload.id;
        let url = NOTE_API + `/${id}`;

        const ret = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });
        if (ret) {
            if (ret.err === undefined || ret.err === null) {
                yield put(loadNoteSuccess(ret.data));
            } else {
                yield put(loadNoteError(ret.err));
            }
        }
    }
}

export function* uploadNote() {

    let action = null;

    while (action = yield take(SAVE_NOTE)) {
        console.log('uploadNote', action.payload.id, action.payload.content);

        let id = action.payload.id || null;
        let data = {
            content: action.payload.content || ''
        };
        let url = NOTE_API;
        let method = "POST";

        if (id) {
            url += `/${id}`;
        } else {
            method = "PUT";
        }

        const ret = yield call(request, url, {
            method: method,
            body: 'content=' + action.payload.content,
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (ret) {
            if (ret.err === undefined || ret.err === null) {
                yield put(saveNoteSuccess(ret.data));
                yield put(loadNotesData());
            } else {
                yield put(saveNoteError(ret.err));
            }
        }
    }
}

export function* deleteNote() {

    let action = null;

    while (action = yield take(DELETE_NOTE)) {
        console.log('deleteNote', action.payload.id, action.payload.content);

        let id = action.payload.id || null;
        let url = NOTE_API;

        if (id) {
            url += `/${id}`;
        }

        const ret = yield call(request, url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (ret) {
            if (ret.err === undefined || ret.err === null) {
                yield put(deleteNoteSuccess(ret.data));
                yield put(loadNotesData());
            } else {
                yield put(deleteNoteError(ret.err));
            }
        }
    }
}


export function* identifyAuth() {

    var action = null;

    while ( action = yield take(IDENTIFY_AUTH)) {

        let url = IDENTIFY_AUTH_API;

        const ret = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (ret) {
            if ((ret.err === undefined || ret.err === null) && ret.data && ret.data.result) {
                yield put(identifyAuthSuccess(ret.data.result));
            } else {
                yield put(identifyAuthError(ret.err));
            }
        }
    }
}



