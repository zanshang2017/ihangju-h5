import {take, takeLatest, call, put, select} from 'redux-saga/effects';
import {
    LOAD_MY_FOLLOW_DATA,
    LOAD_MY_FOLLOW_LIST_DATA,
} from 'containers/FollowPage/constants';

import {
    loadMyFollowDataSuccess,
    loadMyFollowDataError,
    loadMyFollowListDataSuccess,
    loadMyFollowListDataError,
    setMyFollowDataStatus,
} from 'containers/FollowPage/actions';

import {
    MY_FOLLOW_API,
    MY_FOLLOW_LIST_API
} from '../../apis.js';

import request from 'utils/request';


export default [
    getMyFollowData,
    getMyFollowListData,
];

export function* getMyFollowData() {

    let action = null;

    while (action = yield take(LOAD_MY_FOLLOW_DATA)) {

        console.log('getMyFollowData');

        let page = action.payload.page;
        let size = action.payload.size;
        let id = action.payload.id || null;
        let type = action.payload.type || null;

        let url = MY_FOLLOW_API + `?page=${page}&size=${size}`;

        if (id) {
            url += '&id=' + id;
        }

        if (type) {
            url += '&type=' + type;
        }

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists.err === undefined || lists.err === null) {
            // debugger;
            if (lists.data.result && lists.data.result.length > 0) {
                yield put(loadMyFollowDataSuccess(lists.data, page));
            } else {
                yield put(setMyFollowDataStatus({isLast: true}));
            }

        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadMyFollowDataError(lists.err));
        }

    }

}

export function* getMyFollowListData() {

    let action = null;

    while (action = yield take(LOAD_MY_FOLLOW_LIST_DATA)) {

        console.log('getMyFollowListData');

        let page = action.payload.page;
        let size = action.payload.size;

        let url = MY_FOLLOW_LIST_API + `?page=${page}&size=${size}`;

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists.err === undefined || lists.err === null) {
            yield put(loadMyFollowListDataSuccess(lists.data, page));
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadMyFollowListDataError(lists.err));
        }

    }

}

