/*
 *
 * DetailPage actions
 *
 */

import {
  DEFAULT_ACTION,

  LOAD_PROJECTDETAIL_DATA,
  LOAD_PROJECTDETAIL_DATA_SUCCESS,
  LOAD_PROJECTDETAIL_DATA_ERROR,

  LOAD_PROJECTCHAPTER_DATA,
  LOAD_PROJECTCHAPTER_DATA_SUCCESS,
  LOAD_PROJECTCHAPTER_DATA_ERROR,

    LOAD_PROJECT_COPYRIGHT_DATA,
    LOAD_PROJECT_COPYRIGHT_DATA_SUCCESS,
    LOAD_PROJECT_COPYRIGHT_DATA_ERROR,

    SET_SHARE_DATA,
    RESET_COPYRIGHT,
    RESET_STATE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadProjectDetailData(id = null) {
    let data = {
    	type: LOAD_PROJECTDETAIL_DATA,
    	payload: {

    	}
    };
    if (id) {
        data.payload.id = id;
    }
    return data;
}

export function loadProjectDetailDataSuccess(data) {
	return {
		type: LOAD_PROJECTDETAIL_DATA_SUCCESS,
    payload: {
        data: data
    }
	}
}

export function loadProjectDetailDataError(error) {
	return {
		type: LOAD_PROJECTDETAIL_DATA_ERROR,
		payload: {
			error : error
		}
	}
}

export function loadProjectChapterData(id = null) {
  let data = {
    type: LOAD_PROJECTCHAPTER_DATA,
    payload: {

    }
  };
  if(id){
    data.payload.id = id;
  }
  return data;
}

export function loadProjectChapterDataSuccess(data){
  return {
    type: LOAD_PROJECTCHAPTER_DATA_SUCCESS,
    payload: {
      data: data
    }
  }
}

export function loadProjectChapterDataError(error){
  return {
    type: LOAD_PROJECTCHAPTER_DATA_ERROR,
    payload: {
      error: error
    }
  }
}

export function loadProjectCopyrightData(id = null) {
    let data = {
        type: LOAD_PROJECT_COPYRIGHT_DATA,
        payload: {}
    };
    if (id) {
        data.payload.id = id;
    }
    return data;
}

export function loadProjectCopyrightDataSuccess(data) {
    return {
        type: LOAD_PROJECT_COPYRIGHT_DATA_SUCCESS,
        payload: {
            data: data
        }
    }
}

export function loadProjectCopyrightDataError(error) {
    return {
        type: LOAD_PROJECT_COPYRIGHT_DATA_ERROR,
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

export function resetState() {
    return {
        type: RESET_STATE,
    };
}

export function resetCopyright() {
    return {
        type: RESET_COPYRIGHT,
    };
}

