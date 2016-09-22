import {take, takeLatest, call, put, select} from 'redux-saga/effects';
import {
	LOAD_PROJECTDETAIL_DATA,
	LOAD_PROJECTCHAPTER_DATA,
} from 'containers/ProjectDetailPage/constants';

import {
	loadProjectDetailData,
	loadProjectDetailDataSuccess,
	loadProjectDetailDataError,

	loadProjectChapterData,
	loadProjectChapterDataSuccess,
	loadProjectChapterDataError,
} from 'containers/ProjectDetailPage/actions';

import {
	PROJECTDETAIL_API
} from '../../apis.js';

import request from 'utils/request';

export default[
	getProjectDetailData,
	getProjectChapterData,
];

export function* getProjectDetailData(){
	let action = null;
	while(action = yield take(LOAD_PROJECTDETAIL_DATA)) {
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

		if(projectResult.err === undefined || projectResult.err === null){
			yield put(loadProjectDetailDataSuccess(projectResult.data));
			
		}else{
			console.log(projectResult.error.response);
			yield put(loadProjectDetailDataError(projectResult.error));
		}
	}
}

export function* getProjectChapterData(){
	let action = null;
	while(action = yield take(LOAD_PROJECTCHAPTER_DATA)) {
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

		if(projectResult.err === undefined || projectResult.err === null){
			yield put(loadProjectChapterDataSuccess(projectResult.data));
			
		}else{
			console.log(projectResult.error.response);
			yield put(loadProjectChapterDataError(projectResult.error));
		}

	}
}