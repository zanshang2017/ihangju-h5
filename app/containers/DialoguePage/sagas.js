import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_DIALOGUE_DATA,
    SEND_DIALOGUE_DATA,
    GET_LETTERGROUP_ID,
} from './constants';

import {
    loadDialogueDataSuccess,
    loadDialogueDataError,
    sendDialogueDataSuccess,
    sendDialogueDataError,
    getLetterGroupIdSuccess,
    getLetterGroupIdError,
} from './actions'

import {
    DIALOGUE_API,
} from '../../apis.js';

import signals from './signals';

import request from 'utils/request';

import Toast from 'antd-mobile/lib/toast';

export default [
    getDialogueData,
    putDialogueData,
    getUserGroupData,
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
            signals.loadDialogueSuccess.dispatch();
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
            dialogueData.id = lists.data.result.id;
            dialogueData.sendTime = lists.data.result.sendTime;
            yield put(sendDialogueDataSuccess(dialogueData));
            signals.sendDialogueSuccess.dispatch();
        } else {
            console.log(lists.err); // eslint-disable-line no-console
            yield put(sendDialogueDataError(lists.err));
            Toast.fail('发送失败');
        }
    }
}


export function* getUserGroupData() {

    let action = null;

    while (action = yield take(GET_LETTERGROUP_ID)) {
        let userId = action.payload.userId;

        let body = `userid=${userId}`;
        let url = DIALOGUE_API;

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
            yield put(getLetterGroupIdSuccess());
            signals.getLetterGroupIdSuccess.dispatch(lists.data.result.letterId);
        } else {
            console.log(lists.err); // eslint-disable-line no-console
            yield put(getLetterGroupIdError(lists.err));
            Toast.fail('数据获取失败');
        }
    }
}
