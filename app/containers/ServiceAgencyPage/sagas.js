import {take, call, put, select} from 'redux-saga/effects';

import {
	LOAD_SERVICEAGENCY_DATA,
    UPDATE_SERVICEAGENCY_DATA,
} from './constants';

import {
	loadServiceAgencySuccess,
	loadServiceAgencyError,
    updateServiceAgencyDataSuccess,
    updateServiceAgencyDataError,

} from './actions';

import {
	AUTHORATTEST_API,
    UPDATE_SERVICEAGENCY_API,
} from '../../apis.js';


import request from 'utils/request';

export default [
    getServiceAgencyData,
    updateServiceAgencyData
];

export function* getServiceAgencyData() {
	let action = null;
	while (action = yield take(LOAD_SERVICEAGENCY_DATA)) {
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
                    yield put(loadServiceAgencySuccess(authorAttest.data.result));
                } else {
                    //console.log(authorAttest.err.response); // eslint-disable-line no-console
                    yield put(loadServiceAgencyError(authorAttest.err));
                }
            }
		}
	}
}

export function* updateServiceAgencyData() {
    let action = null;

    while (action = yield take(UPDATE_SERVICEAGENCY_DATA)) {


        let url = UPDATE_SERVICEAGENCY_API;
        let method = 'POST';
        let result_data = action.payload.data || null;
        let data = result_data.agency;
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
            return arr.push(k + '=' + arr1.join(','));
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
                    yield put(updateServiceAgencyDataSuccess(updateData.data.result));
                } else {
                    //console.log(authorAttest.err.response); // eslint-disable-line no-console
                    yield put(updateServiceAgencyDataError(updateData.err));
                }
        }
    }
}
