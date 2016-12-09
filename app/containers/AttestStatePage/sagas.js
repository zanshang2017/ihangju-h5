import {take, call, put, select} from 'redux-saga/effects';

import {
	LOAD_ATTESTSTATE_DATA
} from './constants';

import {
	loadAttestStateDataSuccess,
	loadAttestStateDataError,
} from './actions';

import {
	AUTHORATTEST_API
} from '../../apis.js';

import request from 'utils/request';

export default [
    getAttestStateData,
];

export function* getAttestStateData() {
	let action = null;
	while (action = yield take(LOAD_ATTESTSTATE_DATA)) {
		let id = action.payload.id || '';
		if(id) {
			let url = AUTHORATTEST_API + id;
			const authorAttest = yield call(request, url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-Version': 'v1.1'
                },
                credentials: 'include'
            });
            if(authorAttest) {
            	if ((authorAttest.err === undefined || authorAttest.err === null) && (authorAttest.data.result && authorAttest.data.code === 'ok')) {
                    yield put(loadAttestStateDataSuccess(authorAttest.data.result));
                } else {
                    //console.log(authorAttest.err.response); // eslint-disable-line no-console
                    yield put(loadAttestStateDataError(authorAttest.err));
                }
            }
		}
	}
}

