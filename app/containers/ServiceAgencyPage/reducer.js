import {fromJS} from 'immutable';

import {
	DEFAULT_ACTION,

	LOAD_SERVICEAGENCY_DATA,
	LOAD_SERVICEAGENCY_DATA_SUCCESS,
	LOAD_SERVICEAGENCY_DATA_ERROR,

	SET_SERVICEAGENCY_DATA,

	UPDATE_SERVICEAGENCY_DATA,
	UPDATE_SERVICEAGENCY_DATA_SUCCESS,
	UPDATE_SERVICEAGENCY_DATA_ERROR,

} from './constants';

const initialState = fromJS({
	'serviceAgencyData' : {}, 
	'updateSuccess': fromJS({
        data: false
    }),
});

function ServiceAgencyReducer(state = initialState, action = {}) {
	switch (action.type) {
		case DEFAULT_ACTION: 
			return state;
		case LOAD_SERVICEAGENCY_DATA:
			state = state.setIn(['updateSuccess', 'data'], false);
			return state;
		case LOAD_SERVICEAGENCY_DATA_SUCCESS:
			return state.set('serviceAgencyData', fromJS(action.payload.data));
		case LOAD_SERVICEAGENCY_DATA_ERROR:
			return state;
		case SET_SERVICEAGENCY_DATA:
			return state.set('serviceAgencyData', fromJS(action.payload.data));
		case UPDATE_SERVICEAGENCY_DATA:
			return state;
		case UPDATE_SERVICEAGENCY_DATA_SUCCESS:
			state = state.setIn(['updateSuccess', 'data'], true);
			return state;
		case UPDATE_SERVICEAGENCY_DATA_ERROR:
			state = state.setIn(['updateSuccess', 'data'], false);
			return state;
		default: 
			return state;
	}
}

export default ServiceAgencyReducer;