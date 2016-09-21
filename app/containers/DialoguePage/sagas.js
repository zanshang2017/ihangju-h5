import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_DIALOGUE_DATA,
    SEND_DIALOGUE_DATA,
} from './constants';

import {
    loadDialogueDataSuccess,
    loadDialogueDataError,
    sendDialogueDataSuccess,
    sendDialogueDataError,
} from './actions'

import {
    DIALOGUE_API,
} from '../../apis.js';

import signals from './signals';

import request from 'utils/request';

export default [
    getDialogueData,
    putDialogueData,
];

export function* getDialogueData() {

    let action = null;
    while (action = yield take(LOAD_DIALOGUE_DATA)) {

        let id = action.payload.id;
        // let page = action.payload.page || 0;
        let size = 100000; //尚无分页
        let url = DIALOGUE_API + `/${id}/?size=${size}`;

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if ((lists.err === undefined || lists.err === null) && (lists.data.result && lists.data.code === 'ok')) {
            yield put(loadDialogueDataSuccess(lists.data.result));
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadDialogueDataError(lists.err));
        }
    }
}

export function* putDialogueData() {

    let action = null;

    while (action = yield take(SEND_DIALOGUE_DATA)) {
        let dialogueData = action.payload.dialogueData;
        let content = dialogueData.content || '';
        let letterGroupId = action.payload.letterGroupId;

        let body = `content=${content}`;
        let url = DIALOGUE_API + `/${letterGroupId}`;

        const lists = yield call(request, url, {
            method: 'PUT',
            body: body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if ((lists.err === undefined || lists.err === null) && (lists.data.result && lists.data.code === 'ok')) {
            signals.sendDialogueSuccess.dispatch();
            dialogueData.id = lists.data.result.id;
            dialogueData.sendTime = lists.data.result.sendTime;
            yield put(sendDialogueDataSuccess(dialogueData));
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(sendDialogueDataError(lists.err));
        }
    }
}
