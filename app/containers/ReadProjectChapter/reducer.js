import {fromJS} from 'immutable';
import {
	DEFAULT_ACTION,

	LOAD_READCHAPTER_DATA,
	LOAD_READCHAPTER_DATA_SUCCESS,
	LOAD_READCHAPTER_DATA_ERROR,

	SET_PROJECT_INFO,
} from './constants';

const initialState = fromJS({
	'chapterContent' : {},
	'projectInfo' : {},
});

function readProjectChapter(state = initialState, action = {}) {
	switch (action.type) {
		case DEFAULT_ACTION:
			return state;
		
		case LOAD_READCHAPTER_DATA:
			return state;
		
		case LOAD_READCHAPTER_DATA_SUCCESS:
			var data = action.payload.data;
			if(data.code == 'ok' && data.result){
				return state.set("chapterContent", fromJS(data.result));
			}
			return state;
		
		case LOAD_READCHAPTER_DATA_ERROR:
			return state;

		case SET_PROJECT_INFO:
			return state.set('projectInfo', fromJS(action.payload.data));

		default:
			return state;
	}
}

export default readProjectChapter;