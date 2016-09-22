import {take, put, call,} from 'redux-saga/effects';

import {
    LOAD_LIST_DATA,
    SET_FOLLOW_USER,
} from './constants';

import {
    loadListDataSuccess,
    loadListDataError,
    setFollowUserSuccess,
    setFollowUserError,
} from './actions'

import {
    USER_API,
    FOLLOW_USER_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getListData,
    setFollowUser,
];

export function* getListData() {

    let action = null;
    while (action = yield take(LOAD_LIST_DATA)) {

        let id = action.payload.id;
        let page = action.payload.page || 0;
        let size = 10;
        let url = USER_API + `${id}/follows?page=${page}&size=${size}`;

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if ((lists.err === undefined || lists.err === null) && (lists.data.result && lists.data.code === 'ok')) {
            yield put(loadListDataSuccess(lists.data.result, page));
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadListDataError(lists.err));
        }
    }
}


export function* setFollowUser() {

    let action = null;
    while (action = yield take(SET_FOLLOW_USER)) {
        let id = action.payload.id;
        let isToFollow = action.payload.isToFollow;
        let url = FOLLOW_USER_API + `${id}`;

        let method = isToFollow ? 'PUT' :'DELETE';

        console.log(url, method);

        const lists = yield call(request, url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if ((lists.err === undefined || lists.err === null) && (lists.data && lists.data.code === 'ok')) {
            yield put(setFollowUserSuccess(id, isToFollow));
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(setFollowUserError(lists.err));
        }
    }
}