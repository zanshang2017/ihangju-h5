import {
	DEFAULT_ACTION,

	LOAD_READCHAPTER_DATA,
	LOAD_READCHAPTER_DATA_SUCCESS,
	LOAD_READCHAPTER_DATA_ERROR,
  
  SET_PROJECT_INFO,
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