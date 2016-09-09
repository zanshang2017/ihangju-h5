import {
	DEFAULT_ACTION,

	LOAD_READCHAPTER_DATA,
	LOAD_READCHAPTER_DATA_SUCCESS,
	LOAD_READCHAPTER_DATA_ERROR,
  
  SET_PROJECT_INFO,

  LOAD_COLLECTION_DATA,
  LOAD_COLLECTION_DATA_SUCCESS,
  LOAD_COLLECTION_DATA_ERROR,

  LOAD_LIKE_DATA,
  LOAD_LIKE_DATA_SUCCESS,
  LOAD_LIKE_DATA_ERROR,

  SET_SHARE_DATA,
} from './constants';

export function defaultAction() {
	return {
		type: DEFAULT_ACTION,
	}
}

export function loadReadChapterData(projectId = null , chapterId = null) {
  let data = {
    type: LOAD_READCHAPTER_DATA,
    payload: {

    }
  };
  if(projectId){
    data.payload.projectId = projectId;
  }
  if(chapterId){
    data.payload.chapterId = chapterId;	
  }
  return data;
}

export function loadReadChapterDataSuccess(data){
  return {
    type: LOAD_READCHAPTER_DATA_SUCCESS,
    payload: {
      data: data
    }
  }
}

export function loadReadChapterDataError(error){
  return {
    type: LOAD_READCHAPTER_DATA_ERROR,
    payload: {
      error: error
    }
  }
}

export function setProjectInfo(projectInfo) {
  let data = {
    type: SET_PROJECT_INFO,
    payload: {
      data: projectInfo
    }
  }
  return data;
}

export function loadCollectionData(url,method){
  let data = {
    type: LOAD_COLLECTION_DATA,
    payload: {}
  };
  if(url){
    data.payload.url = url;
  }
  if(method){
    data.payload.method = method;
  }
  return data;
}

export function loadCollectionDataSuccess(data){
  return {
    type: LOAD_COLLECTION_DATA_SUCCESS,
    payload: {
      data: data
    }
  }
}

export function loadCollectionDataError(error){
  return {
    type: LOAD_READCHAPTER_DATA_ERROR,
    payload: {
      error: error
    }
  }
}

export function loadLikeData(url, method){
  let data = {
    type: LOAD_LIKE_DATA,
    payload: {}
  };
  if(url){
    data.payload.url = url;
  }
  if(method){
    data.payload.method =  method;
  }
  return data;
}

export function loadLikeDataSuccess(data){
  return {
    type: LOAD_LIKE_DATA_SUCCESS,
    payload: {
      data: data
    }
  }
}

export function loadLikeDataError(error){
  return {
    type: LOAD_LIKE_DATA_ERROR,
    payload: {
      error: error
    }
  }
}

export function setShareData(shareData){
  return {
    type: SET_SHARE_DATA,
    payload: {
      data: shareData
    }
  }
}
