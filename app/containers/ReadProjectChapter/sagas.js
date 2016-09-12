import {take, takeLatest, call, put, select} from 'redux-saga/effects';
import {
	LOAD_READCHAPTER_DATA,
	LOAD_COLLECTION_DATA,
	LOAD_LIKE_DATA,
} from 'containers/ReadProjectChapter/constants';

import {
	loadReadChapterData,
	loadReadChapterDataSuccess,
	loadReadChapterDataError,

	loadCollectionData,
	loadCollectionDataSuccess,
	loadCollectionDataError,

	loadLikeData,
	loadLikeDataSuccess,
	loadLikeDataError,
} from 'containers/ReadProjectChapter/actions';

import {
	READCHAPTER_API,
	COLLECTION_API,
} from '../../apis.js';

import request from 'utils/request';

export default[
	getReadChapterData,
	changeCollection,
	changeLike,
];

import {
    locStorage
} from 'utils/util';

export function* getReadChapterData(){
	let action = null;
	while(action = yield take(LOAD_READCHAPTER_DATA)) {
		var pid = action.payload.projectId || null;
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
			if(projectResult.data){
				let projectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
				// let readInfo = {};
				// if(projectInfo.length < 1){
				// 	readInfo.pid = pid;
				// 	readInfo.cid = cid;
				//  	projectInfo.push(readInfo);
				//  }else{
				//  	for(var i=0;i<projectInfo.length;i++){
				//  		if(projectInfo[i].pid !== pid){
				//  			readInfo.pid = pid;
				//  			readInfo.cid = cid;
				//  			projectInfo.push(readInfo);
				//  		}else{
				//  			projectInfo[i].cid = cid;
				//  		}
				// 	}
				// }
				if(projectInfo[pid]){
					projectInfo[pid].push(cid);
				}else{
					projectInfo[pid]= [];
					projectInfo[pid].push(cid);
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

export function* changeCollection(){
	let action = null;
	while(action = yield take(LOAD_COLLECTION_DATA)) {
		let url = action.payload.url;
		let method = action.payload.method;
		
		const collectionResult = yield call(request, url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });
		if(collectionResult.err === undefined || collectionResult.err === null){
			yield put(loadCollectionDataSuccess(collectionResult.data));
		}else{
			console.log(collectionResult.error.response);
			yield put(loadCollectionDataError(collectionResult.error));
		}

	}
}

export function* changeLike(){
	let action = null;
	while(action = yield take(LOAD_LIKE_DATA)) {
		let url = action.payload.url;
		let method = action.payload.method;

		const likeResult = yield call(request, url, {
			method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
		})

		if(likeResult.err === undefined || likeResult.err === null){
			yield put(loadLikeDataSuccess(likeResult.data));
		}else{
			console.log(likeResult.error.response);
			yield put(loadLikeDataError(likeResult.error));
		}

	}
}