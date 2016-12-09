import {fromJS} from 'immutable';

import {
	DEFAULT_ACTION,

	LOAD_ATTESTSTATE_DATA,
	LOAD_ATTESTSTATE_DATA_SUCCESS,
	LOAD_ATTESTSTATE_DATA_ERROR,

} from './constants';

const initialState = fromJS({
	'attestStateData' : {}
});

function AttestStateReducer (state = initialState, action = {}) {
	switch (action.type) {
		case DEFAULT_ACTION: 
			return state;

		case LOAD_ATTESTSTATE_DATA: 
			return state;

		case LOAD_ATTESTSTATE_DATA_SUCCESS:
			return state.set('attestStateData', fromJS(action.payload.data));

		case LOAD_ATTESTSTATE_DATA_ERROR: 
			return state;

		default:
			return state;
	} 
}

export default AttestStateReducer;

