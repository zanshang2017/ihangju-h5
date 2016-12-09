
import { fromJS } from 'immutable';
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
    RESET_STATE,
    RESET_COPYRIGHT,
} from './constants';

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

const initialState = fromJS({
	'projectDetailChapter' : {},
	"projectDetail": {},
    'projectCopyright': false,
  'shareData' : {}
});

function detailPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_PROJECTDETAIL_DATA:
    	return state;
    case LOAD_PROJECTDETAIL_DATA_SUCCESS:
    	var data = action.payload.data;
    	if(data.code == "ok" && data.result){
    		return state.set("projectDetail", fromJS(data.result));
    	}
    	return state;
    case LOAD_PROJECTDETAIL_DATA_ERROR:
    	return state;
    case LOAD_PROJECTCHAPTER_DATA:
      return state;
    case LOAD_PROJECTCHAPTER_DATA_SUCCESS:
      var data =  action.payload.data;
      if(data.code == "ok" && data.result){
          return state.set("projectDetailChapter", fromJS(data.result));
      }
      return state;
    case LOAD_PROJECTCHAPTER_DATA_ERROR:
      return state;

      case LOAD_PROJECT_COPYRIGHT_DATA:
          return state;

      case LOAD_PROJECT_COPYRIGHT_DATA_SUCCESS:
          var data = action.payload.data;

          if (data.code) {
              return state.set("projectCopyright", fromJS(data));
          }

          return state;

      case LOAD_PROJECT_COPYRIGHT_DATA_ERROR:
          return state;

    case SET_SHARE_DATA:
      state = state.setIn(['shareData'], fromJS(action.payload.data));
      return state;

      case RESET_STATE:
          return initialState;

      case RESET_COPYRIGHT:
          return state.set("projectCopyright", false);

      case LOGOUT_SUCCESS:
          return initialState;

    default:
      return state;
  }
}

export default detailPageReducer;
