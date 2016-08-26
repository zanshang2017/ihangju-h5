import {take, takeLatest, call, put, select} from 'redux-saga/effects';
import {
	LOAD_READCHAPTER_DATA
} from 'containers/ReadProjectChapter/constants';

import {
	loadReadChapterData,
	loadReadChapterDataSuccess,
	loadReadChapterDataError,
} from 'containers/ReadProjectChapter/actions';

import {
	READCHAPTER_API
} from '../../apis.js';

import request from 'utils/request';

export default[
	getReadChapterData,
];

import {
    locStorage
} from 'utils/util';

export function* getReadChapterData(){
	let action = null;
	while(action = yield take(LOAD_READCHAPTER_DATA)) {
		console.log('getReadChapterdata');
		let pid = action.payload.projectId || null;
		var cid = action.payload.chapterId || null;
		let url = READCHAPTER_API + `/` + pid + `/chapters`;

		const projectResult = yield call(request, url, {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
		});

		if(projectResult.err === undefined || projectResult.err === null){
			debugger;
			if(projectResult.data){
				let projectInfo = JSON.parse(locStorage.get('projectInfo')) || [];
				let readInfo = {};
				var pid = projectResult.data.result.historyId;
				if(projectInfo.length < 1){
					readInfo.pid = pid;
					readInfo.cid = cid;
				 	projectInfo.push(readInfo);
				 }else{
				 	for(var i=0;i<projectInfo.length;i++){
				 		if(projectInfo[i].pid !== pid){
				 			readInfo.pid = pid;
				 			readInfo.cid = cid;
				 			projectInfo.push(readInfo);
				 		}else{
				 			projectInfo[i].cid = cid;
				 		}
					}
				}
				locStorage.set('projectInfo', JSON.stringify(projectInfo));
			};
			yield put(loadReadChapterDataSuccess(projectResult.data));
			
		}else{
			console.log(projectResult.error.response);
			yield put(loadReadChapterDataError(projectResult.error));
		}
	}
}