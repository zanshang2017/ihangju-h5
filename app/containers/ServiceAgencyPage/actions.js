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

export function defaultAction() {
	return {
		type: DEFAULT_ACTION,
	}
}

export function loadServiceAgency(id = null) {
	return {
		type: LOAD_SERVICEAGENCY_DATA,
		payload: {
			id: id
		}
	}
}

export function loadServiceAgencySuccess(data) {
	return {
		type: LOAD_SERVICEAGENCY_DATA_SUCCESS,
		payload: {
			data: data
		}
	}
}

export function loadServiceAgencyError(error) {
	return {
		type: LOAD_SERVICEAGENCY_DATA_ERROR,
		payload: {
			error: error
		}
	}
}

export function setServiceAgencyData(data) {
	return {
		type: SET_SERVICEAGENCY_DATA,
		payload: {
			data: data
		}
	}
}

export function updateServiceAgencyData(data) {
	return {
		type: UPDATE_SERVICEAGENCY_DATA,
		payload: {
			data: data
		}
	}
}

export function updateServiceAgencyDataSuccess(data) {
	return {
		type: UPDATE_SERVICEAGENCY_DATA_SUCCESS,
		payload: {
			data: data
		}
	}
}

export function updateServiceAgencyDataError(error) {
	return {
		type: UPDATE_SERVICEAGENCY_DATA_ERROR,
		payload: {
			error: error
		}
	}
}
