import {take, call, put, select} from 'redux-saga/effects';

import {
	LOAD_SERVICEPERSONAL_DATA,
    UPDATE_SERVICEPERSONAL_DATA
} from './constants';

import {
	loadServicePersonalSuccess,
	loadServicePersonalError,
    updateServicePersonalDataSuccess,
    updateServicePersonalDataError,
} from './actions'

import {
	AUTHORATTEST_API,
    UPDATE_SERVICEPERSONAL_API
} from '../../apis.js';

import request from 'utils/request';

export default [
    getServicePersonalData,
    updateServicePersonalData
];

export function* getServicePersonalData() {
	let action = null;
	while (action = yield take(LOAD_SERVICEPERSONAL_DATA)) {
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
                    yield put(loadServicePersonalSuccess(authorAttest.data.result));
                } else {
                    //console.log(authorAttest.err.response); // eslint-disable-line no-console
                    yield put(loadServicePersonalError(authorAttest.err));
                }
            }
		}
	}
}

export function* updateServicePersonalData() {
    let action = null;

    while (action = yield take(UPDATE_SERVICEPERSONAL_DATA)) {


        let url = UPDATE_SERVICEPERSONAL_API;
        let method = 'POST';
        let result_data = action.payload.data || null;
        let data = result_data.individual;
        let body = '';

        let arr = [];
        let arr1 = [];
        for(let k in data) {
            if(k == 'competencepurview') {
                a(k,data[k]);
                continue;
            }
            arr.push(k + '=' + data[k])
        }
        function a(k,data) {
            for(let i in data) {
                if(data[i].select == 'enable') {
                    arr1.push(data[i].id)   
                }else {
                    continue;
                }
                
            }
            return arr.push(k + '=' + arr1.join('%'));
        }


        body = arr.join('&');

        



        if(result_data.hasidentityauthentication == false) {
            method = 'PUT'
        }else {
            method = 'POST'
        }

        const updateData = yield call(request, url, {
            method: method,
            body: body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });
        if(updateData) {
            if (updateData.data.code === 'ok') {
                    yield put(updateServicePersonalDataSuccess(updateData.data.result));
                } else {
                    //console.log(authorAttest.err.response); // eslint-disable-line no-console
                    yield put(updateServicePersonalDataError(updateData.err));
                }
        }
    }
}
