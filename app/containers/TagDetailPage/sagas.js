import {take, call, put, select} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';

import {
    LOAD_TAG_LIST,
    EDIT_TAG,
    LOAD_TAG_RECOMMENDATION_LIST,
    SUB_TAG,
    CANCEL_SUB_TAG,
    RECOMMENDATION_PROJECT,
} from 'containers/TagDetailPage/constants';

import {
    loadTagList,
    loadTagListSuccess,
    loadTagListError,

    editTag,
    editTagSuccess,
    editTagError,

    loadTagRecommendationList,
    loadTagRecommendationListSuccess,
    loadTagRecommendationListError,

    subTag,
    subTagSuccess,
    subTagError,

    cancelSubTag,
    cancelSubTagSuccess,
    cancelSubTagError,

    recommendationProject,
    recommendationProjectSuccess,
    recommendationProjectError,

    setProjectListStatus,
    setRecommendationListStatus
} from 'containers/TagDetailPage/actions';

import {
    TAG_API,
    SUB_TAG_API,
} from '../../apis.js';

import request from 'utils/request';


export default [
    getTagList,
    postEditTag,
    getTagRecommendationList,
    putSubTag,
    deleteSubTag,
    tagRecommendationProject,
];

export function* getTagList() {

    let action = null;

    while (action = yield take(LOAD_TAG_LIST)) {

        let page = action.payload.page;
        let size = action.payload.size;
        let id = action.payload.id;

        console.log('getTagList', id);

        let url = TAG_API + `/${id}?page=${page}&size=${size}`;

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists.err === undefined || lists.err === null) {
            if (lists.data.result) {
                if (lists.data.result.projects && lists.data.result.projects.length <= 0) {
                    yield [put(loadTagListSuccess(lists.data, page)), put(setProjectListStatus({isLast: true}))];
                } else {
                    yield put(loadTagListSuccess(lists.data, page));
                }
            } else {
                yield put(setProjectListStatus({isLast: true}));
            }
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadTagListError(lists.err));
        }
    }
}

export function* getTagRecommendationList() {

    let action = null;

    while (action = yield take(LOAD_TAG_RECOMMENDATION_LIST)) {

        console.log('getTagRecommendationList');

        let id = action.payload.id;
        let page = action.payload.page;
        let size = action.payload.size;

        let url = TAG_API + `/${id}/recommdation/project?page=${page}&size=${size}`;

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
                yield put(loadTagRecommendationListSuccess(lists.data, page));
            } else {
                yield put(setRecommendationListStatus({isLast: true}));
            }
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadRecommendationListError(lists.err));
        }
    }
}


export function* putSubTag() {

    let action = null;

    while (action = yield take(SUB_TAG)) {
        console.log('subTag');
        let id = action.payload.id;

        let url = SUB_TAG_API + `/${id}`;

        const lists = yield call(request, url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists.err === undefined || lists.err === null) {
            if (lists.data.code === 'ok') {
                yield put(subTagSuccess());
            }
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(subTagError(lists.err));
        }
    }
}

export function* postEditTag() {

    let action = null;

    while (action = yield take(EDIT_TAG)) {

        console.log('editTag');

        let id = action.payload.id;
        let image = action.payload.image;
        let desc = action.payload.desc;

        let url = TAG_API + `/${id}`;

        const lists = yield call(request, url, {
            method: 'POST',
            body: 'description=' + desc + '&image=' + image,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists.err === undefined || lists.err === null) {
            if (lists.data.result) {
                yield put(editTagSuccess(lists.data, page));
            }
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(editTagError(lists.err));
        }
    }
}


export function* deleteSubTag() {

    let action = null;

    while (action = yield take(CANCEL_SUB_TAG)) {
        console.log('cancelSubTag');
        let id = action.payload.id;

        let url = SUB_TAG_API + `/${id}`;

        const lists = yield call(request, url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists.err === undefined || lists.err === null) {
            if (lists.data.code === 'ok') {
                yield put(cancelSubTagSuccess());
            }
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(cancelSubTagError(lists.err));
        }
    }
}

export function* tagRecommendationProject() {

    let action = null;

    while (action = yield take(RECOMMENDATION_PROJECT)) {

        let id = action.payload.id;
        let tagID = action.payload.tagID;
        let isRemove = action.payload.isRemove || false;

        let method = '',
            url = '',
            body = '';

        if (isRemove) {
            method = 'DELETE';
            url = TAG_API + `/${tagID}/recommendation/project?projectids=${id}`;
        } else {
            method = 'PUT';
            url = TAG_API + `/${tagID}/recommendation/project`;
            body = 'projectids=' + id;
        }

        console.log('recommendationProject', id, tagID, method, url, body);

        const lists = yield call(request, url, {
            method: method,
            body: body,
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists.err === undefined || lists.err === null) {
            if (lists.data.code === 'ok') {
                yield put(recommendationProjectSuccess(id, isRemove));
            }
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(recommendationProjectError(lists.err));
        }
    }
}
