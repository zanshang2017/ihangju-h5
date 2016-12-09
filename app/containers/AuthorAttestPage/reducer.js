import {fromJS} from 'immutable';

import {
	DEFAULT_ACTION,
	LOAD_AUTHORATTEST_DATA,
	LOAD_AUTHORATTEST_DATA_SUCCESS,
	LOAD_AUTHORATTEST_DATA_ERROR,

	SET_AUTHORATTEST_DATA,

	UPDATE_AUTHORATTEST_DATA,
	UPDATE_AUTHORATTEST_DATA_SUCCESS,
	UPDATE_AUTHORATTEST_DATA_ERROR,

} from './constants';

const initialState = fromJS({
	'authorAttestData' : {}, 
});

function AuthorAttestReducer(state = initialState, action = {}) {
	switch (action.type) {
		case DEFAULT_ACTION: 
			return state;

		case LOAD_AUTHORATTEST_DATA:
			return state;

		case LOAD_AUTHORATTEST_DATA_SUCCESS:
			return state.set('authorAttestData', fromJS(action.payload.data));

		case LOAD_AUTHORATTEST_DATA_ERROR:
			return state;
		case SET_AUTHORATTEST_DATA:
			return state.set('authorAttestData', fromJS(action.payload.data));
		case UPDATE_AUTHORATTEST_DATA:
			return state;
		case UPDATE_AUTHORATTEST_DATA_SUCCESS:
			return state.set('authorAttestData', fromJS(action.payload.data));
		case UPDATE_AUTHORATTEST_DATA_ERROR:
			return state;
		default: 
			return state;
	}
}

export default AuthorAttestReducer;