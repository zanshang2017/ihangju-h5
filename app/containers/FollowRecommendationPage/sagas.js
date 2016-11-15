import {take, put, call,} from 'redux-saga/effects';

import {
    LOAD_RECOMMENDATION_DATA,
    SETTINT_FOLLOW,
} from './constants';

import {
    loadRecommendationDataSuccess,
    loadRecommendationDataError,
} from './actions'

import {
    FOLLOW_RECOMMENDATION_API,
    MY_FOLLOW_SETTING_API,
} from 'apis.js';

import signals from './signals';

import request from 'utils/request';

export default [
    getListData,
    putFollow,
];

export function* getListData() {

    let action = null;
    while (action = yield take(LOAD_RECOMMENDATION_DATA)) {

        let url = FOLLOW_RECOMMENDATION_API;

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
                yield put(loadRecommendationDataSuccess(lists.data.result));
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(loadRecommendationDataError(lists.err));
            }
        }
    }
}


export function* putFollow() {

    let action = null;

    while (action = yield take(SETTINT_FOLLOW)) {
        console.log('subTag');

        let tags = action.payload.tags;
        let users = action.payload.users;
        let body = 'tagids=' + tags.join(',') + '&userids=' + users.join(',');
        let url = MY_FOLLOW_SETTING_API;

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
            if (lists.err === undefined || lists.err === null) {
                if (lists.data.code === 'ok') {
                    signals.putFollowSuccess.dispatch();
                }
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                signals.putFollowError.dispatch();
            }
        }
    }
}
