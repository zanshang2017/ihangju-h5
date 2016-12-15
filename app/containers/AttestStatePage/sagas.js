import {take, call, put, select} from 'redux-saga/effects';

import {
	LOAD_ATTESTSTATE_DATA,
    LOAD_HELP_DATA,

} from './constants';

import {
	loadAttestStateDataSuccess,
	loadAttestStateDataError,
    loadHelpDataSuccess,
    loadHelpDataError,
} from './actions';

import {
	AUTHORATTEST_API,
    FAIL_HELP_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getAttestStateData,
    getloadHelpData
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

export function* getloadHelpData() {
    let action = null;
    while (action = yield take(LOAD_HELP_DATA)) {
        let url = FAIL_HELP_API;
        const failHelp = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });
        if(failHelp) {
            if(failHelp.data.code == 'ok') {
                yield put(loadHelpDataSuccess(failHelp.data.result));
            }else {
                yield put(loadHelpDataError(failHelp.err));
            }
        }
    }
}







