import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_COMMENTS_DATA,
    SEND_COMMENTS_DATA,
} from './constants';

import {
    loadCommentsDataSuccess,
    loadCommentsDataError,
    sendCommentsDataSuccess,
    sendCommentsDataError,
} from './actions'

import {
    COMMENT_API,
    ANSWER_API,
    PROJECT_API,
} from '../../apis.js';

import signals from './signals';

import request from 'utils/request';

export default [
    getCommentsData,
    putCommentData,
];

export function* getCommentsData() {

    let action = null;
    while (action = yield take(LOAD_COMMENTS_DATA)) {

        let id = action.payload.id;
        let page = action.payload.page || 0;
        let size = 10;
        let url = PROJECT_API + `/${id}/comments?page=${page}&size=${size}`;

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists) {
            if ((lists.err === undefined || lists.err === null) && (lists.data.result && lists.data.code === 'ok')) {
                yield put(loadCommentsDataSuccess(lists.data.result, page));
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(loadCommentsDataError(lists.err));
            }
        }
    }
}

export function* putCommentData() {

    let action = null;

    while (action = yield take(SEND_COMMENTS_DATA)) {
        let replyData = action.payload.replyData;

        let content = replyData.content || '';
        let type = replyData.type;
        let parentid = replyData.parentid;
        let projectid = replyData.projectid;

        let body = '';
        let url = '';

        if (type) { // 对评论的回复
            body = `content=${content}&parentid=${parentid}&type=${type}`;
            url = ANSWER_API;
        } else { // 评论
            body = `content=${content}&projectid=${projectid}`;
            url = COMMENT_API;
        }

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

        if (lists) {
            if ((lists.err === undefined || lists.err === null) && (lists.data.result && lists.data.code === 'ok')) {
                console.log('评论成功!');
                //发起评论数 　埋点
                zhuge.track('发起评论数');
                yield put(sendCommentsDataSuccess(lists.data.result, replyData));
                signals.sendCommentSuccess.dispatch();
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(sendCommentsDataError(lists.err));
            }
        }
    }
}
