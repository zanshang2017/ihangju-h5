
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,

  LOAD_PROJECTDETAIL_DATA,
  LOAD_PROJECTDETAIL_DATA_SUCCESS,
  LOAD_PROJECTDETAIL_DATA_ERROR,

  LOAD_PROJECTCHAPTER_DATA,
  LOAD_PROJECTCHAPTER_DATA_SUCCESS,
  LOAD_PROJECTCHAPTER_DATA_ERROR,
} from './constants';

const initialState = fromJS({
	'projectDetailChapter' : {},
	"projectDetail": {}
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
    default:
      return state;
  }
}

export default detailPageReducer;
