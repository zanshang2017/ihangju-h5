import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import {
    LOAD_DISCOVERIES_DATA,
    LOAD_RECOMMENDATION_DATA,
} from 'containers/FoundPage/constants';

import {
    loadDiscoveriesDataSuccess,
    loadDiscoveriesDataError,
    loadRecommendationDataSuccess,
    loadRecommendationDataError
} from 'containers/FoundPage/actions';

import {
    DISCOVERIES_API,
    RECOMMENDATION_API
} from '../../apis.js';

import request from 'utils/request';


export default [
    getDiscoveriesData,
    getRecommendationData,
];


export function* getDiscoveriesData() {

    console.log('*** saga getDiscoveriesData');

    while (yield take(LOAD_DISCOVERIES_DATA)) {
        console.log('getDiscoveriesData');

        const lists = yield call(request, DISCOVERIES_API, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            }
        });

        if (lists) {
            if (lists.err === undefined || lists.err === null) {
                yield put(loadDiscoveriesDataSuccess(lists.data));
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(loadDiscoveriesDataError(lists.err));
            }
        }
    }
}


export function* getRecommendationData() {

    let action = yield take(LOAD_RECOMMENDATION_DATA);

    let page = action.payload.page;
    let size = action.payload.size;
    let url = RECOMMENDATION_API + `?page=${page}&size=${size}`;

    const lists = yield call(request, url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-Version': 'v1.1'
        }
    });

    if (lists) {
        if (lists.err === undefined || lists.err === null) {
            yield put(loadRecommendationDataSuccess(lists.data));
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadRecommendationDataError(lists.err));
        }
    }
}

