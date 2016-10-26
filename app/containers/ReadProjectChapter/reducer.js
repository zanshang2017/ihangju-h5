import {fromJS} from 'immutable';
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

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

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
			state = state.setIn(['projectInfo'], fromJS(action.payload.data));
            return state;
		case LOAD_COLLECTION_DATA:
			return state;

		case LOAD_COLLECTION_DATA_SUCCESS:
			var data = action.payload.data;
			if(data.code == 'ok'){
				let con = state.toJS();
				con.chapterContent.collection = !con.chapterContent.collection;
				return state.set("chapterContent", fromJS(con.chapterContent));				
			}
			return state;

		case LOAD_COLLECTION_DATA_ERROR:
			return state;

		case LOAD_LIKE_DATA: 
			return state;

		case LOAD_LIKE_DATA_SUCCESS:
			var data = action.payload.data;
			if(data.code == 'ok'){
				let con = state.toJS();
				con.chapterContent.like = !con.chapterContent.like;
				return state.set("chapterContent", fromJS(con.chapterContent));				
			}
			return state;
		case LOAD_LIKE_DATA_ERROR:
			return state;
		
		case SET_SHARE_DATA:
            state = state.setIn(['shareData'], fromJS(action.payload.data));
            return state;

        case LOGOUT_SUCCESS:
            return initialState;

		default:
			return state;
	}
}

export default readProjectChapter;

