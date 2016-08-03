import {take, takeLatest, call, put, select} from 'redux-saga/effects';
import {
    LOAD_NOTES_DATA,
    LOAD_NOTE,
    SAVE_NOTE,
} from 'containers/CreatePage/constants';

import {
    loadNotesDataSuccess,
    loadNotesDataError,
    loadNoteSuccess,
    loadNoteError
} from 'containers/CreatePage/actions';

import {
    NOTE_LIST_API,
    NOTE_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getNotesData,
    getNote,
    postNote,
];

export function* getNotesData() {

    let action = null;

    while (action = yield take(LOAD_NOTES_DATA)) {
        console.log('getNotesData');

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

        if (lists.err === undefined || lists.err === null) {
            yield put(loadNotesDataSuccess(lists.data, page));
        } else {
            yield put(loadNotesDataError(lists.err));
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

        if (ret.err === undefined || ret.err === null) {
            // alert('note加载success!');
            yield put(loadNoteSuccess(ret.data));
        } else {
            // alert('note加载error');
            yield put(loadNoteError(ret.err));
        }

    }
}

export function* postNote() {

    let action = null;

    while (action = yield take(SAVE_NOTE)) {
        console.log('postNote', action.payload.id, action.payload.content);

        let id = action.payload.id;
        let data = {
            content: action.payload.content
        };

        let url = NOTE_API + `/${id}`;

        const ret = yield call(request, url, {
            method: "POST",
            body: 'content=' + action.payload.content,
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (ret.err === undefined || ret.err === null) {
            alert('note保存success!');
            // yield put(loadNotesDataSuccess(ret.data));
        } else {
            alert('note保存error');
            // yield put(loadNotesDataError(lists.err));
        }

    }
}




