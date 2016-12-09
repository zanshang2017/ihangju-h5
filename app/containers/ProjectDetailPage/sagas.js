import {take, takeLatest, call, put, select} from 'redux-saga/effects';
import {
    LOAD_PROJECTDETAIL_DATA,
    LOAD_PROJECTCHAPTER_DATA,
    LOAD_PROJECT_COPYRIGHT_DATA,
} from 'containers/ProjectDetailPage/constants';

import {
    loadProjectDetailData,
    loadProjectDetailDataSuccess,
    loadProjectDetailDataError,

    loadProjectChapterData,
    loadProjectChapterDataSuccess,
    loadProjectChapterDataError,

    loadProjectCopyrightDataSuccess,
    loadProjectCopyrightDataError,
} from 'containers/ProjectDetailPage/actions';

import signals from './signals';

import {
    PROJECTDETAIL_API
} from '../../apis.js';

import Toast from 'antd-mobile/lib/toast';

import request from 'utils/request';

export default[
    getProjectDetailData,
    getProjectChapterData,
    getProjectCopyrightData,
];

export function* getProjectDetailData() {
    let action = null;
    while (action = yield take(LOAD_PROJECTDETAIL_DATA)) {
        console.log('getProjectDetailData');
        let id = action.payload.id || null;
        let url = PROJECTDETAIL_API + `/` + id;
        const projectResult = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (projectResult) {
            if (projectResult.err === undefined || projectResult.err === null) {
                yield put(loadProjectDetailDataSuccess(projectResult.data));

            } else {
                console.log(projectResult.error.response);
                yield put(loadProjectDetailDataError(projectResult.error));
            }
        }
    }
}

export function* getProjectChapterData() {
    let action = null;
    while (action = yield take(LOAD_PROJECTCHAPTER_DATA)) {
        console.log('getProjectChapterData');
        let id = action.payload.id || null;
        //http://192.168.1.33:8888/project/57a941f4e4b0ab2d4f0d14cd/catalog
        let url = PROJECTDETAIL_API + `/` + id + `/catalog`;
        const projectResult = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (projectResult) {
            if (projectResult.err === undefined || projectResult.err === null) {
                yield put(loadProjectChapterDataSuccess(projectResult.data));

            } else {
                console.log(projectResult.error.response);
                yield put(loadProjectChapterDataError(projectResult.error));
            }
        }

    }
}


export function* getProjectCopyrightData() {
    let action = null;
    while (action = yield take(LOAD_PROJECT_COPYRIGHT_DATA)) {
        console.log('getProjectCopyrightData');
        let id = action.payload.id || null;
        //http://192.168.1.33:8888/project/57a941f4e4b0ab2d4f0d14cd/copyright
        let url = PROJECTDETAIL_API + `/` + id + `/copyright`;
        const _result = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        try {
            Toast.hide();
        } catch (e) {
        }

        if (_result) {
            if (_result.err === undefined || _result.err === null) {
                yield put(loadProjectCopyrightDataSuccess(_result.data));
                signals.loadCopyrightSuccess.dispatch(_result.data);
            } else {
                console.log(_result.error.response);
                yield put(loadProjectCopyrightDataError(_result.error));
            }
        } else {
            yield put(loadProjectCopyrightDataError(null));
        }

    }
}


