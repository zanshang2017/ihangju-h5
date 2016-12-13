import {fromJS} from 'immutable';

import {
	DEFAULT_ACTION,

	LOAD_SERVICEPERSONAL_DATA,
	LOAD_SERVICEPERSONAL_DATA_SUCCESS,
	LOAD_SERVICEPERSONAL_DATA_ERROR,

	SET_SERVICEPERSONAL_DATA,

	UPDATE_SERVICEPERSONAL_DATA,
	UPDATE_SERVICEPERSONAL_DATA_SUCCESS,
	UPDATE_SERVICEPERSONAL_DATA_ERROR,
} from './constants';

const initialState = fromJS({
	'servicePersonalData' : {},
	'updateSuccess': fromJS({
        data: false
    }),
});

function ServicePersonalReducer(state = initialState, action = {}) {
	switch (action.type) {
		case DEFAULT_ACTION: 
			return state;

		case LOAD_SERVICEPERSONAL_DATA:
			state = state.setIn(['updateSuccess', 'data'], false);
			return state;

		case LOAD_SERVICEPERSONAL_DATA_SUCCESS:
			return state.set('servicePersonalData', fromJS(action.payload.data));

		case LOAD_SERVICEPERSONAL_DATA_ERROR:
			return state;
		case SET_SERVICEPERSONAL_DATA:
			return state.set('servicePersonalData', fromJS(action.payload.data));

		case UPDATE_SERVICEPERSONAL_DATA:
			return state;
		case UPDATE_SERVICEPERSONAL_DATA_SUCCESS:
			state = state.setIn(['updateSuccess', 'data'], true);
			return state;
		case UPDATE_SERVICEPERSONAL_DATA_ERROR:
			state = state.setIn(['updateSuccess', 'data'], false);
			return state;
		default: 
			return state;
	}
}

export default ServicePersonalReducer;