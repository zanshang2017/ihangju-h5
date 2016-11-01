import {take, call, put, select} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';

import {
    LOAD_COMMENT_LIST,
    LOAD_MESSAGE_LIST,
} from './constants';

import {
    loadCommentListSuccess,
    loadCommentListError,
    loadMessageListSuccess,
    loadMessageListError,
    setCommentListStatus,
    setMessageListStatus
} from './actions';

import {
    COMMENT_LIST_API,
    MESSAGE_LIST_API,
} from '../../apis.js';

import request from 'utils/request';


export default [
    getCommentList,
    getMessageList,
];

export function* getCommentList() {

    let action = null;

    while (action = yield take(LOAD_COMMENT_LIST)) {

        let page = action.payload.page;
        let size = action.payload.size;

        let url = COMMENT_LIST_API + `?page=${page}&size=${size}`;

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
                if (lists.data.result) {
                    if (lists.data.result && lists.data.result.length <= 0) {
                        yield [put(loadCommentListSuccess(lists.data, page)), put(setCommentListStatus({isLast: true}))];
                    } else {
                        yield put(loadCommentListSuccess(lists.data, page));
                    }
                } else {
                    yield put(setCommentListStatus({isLast: true}));
                }
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(loadCommentListError(lists.err));
            }
        }
    }
}

export function* getMessageList() {

    let action = null;

    while (action = yield take(LOAD_MESSAGE_LIST)) {

        console.log('getMessageList');

        let page = action.payload.page;
        let size = action.payload.size;

        let url = MESSAGE_LIST_API + `?page=${page}&size=${size}`;

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists.err === undefined || lists.err === null) {
            if (lists.data.result && lists.data.result.length > 0) {
                yield put(loadMessageListSuccess(lists.data, page));
            } else {
                yield put(setMessageListStatus({isLast: true}));
            }
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadMessageListError(lists.err));
        }
    }
}

