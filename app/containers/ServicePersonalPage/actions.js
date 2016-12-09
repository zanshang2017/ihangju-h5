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

export function defaultAction() {
	return {
		type: DEFAULT_ACTION,
	}
}

export function loadServicePersonal(id = null) {
	return {
		type: LOAD_SERVICEPERSONAL_DATA,
		payload: {
			id: id
		}
	}
}

export function loadServicePersonalSuccess(data) {
	return {
		type: LOAD_SERVICEPERSONAL_DATA_SUCCESS,
		payload: {
			data: data
		}
	}
}

export function loadServicePersonalError(error) {
	return {
		type: LOAD_SERVICEPERSONAL_DATA_ERROR,
		payload: {
			error: error
		}
	}
}

export function setServicePersonalData(data) {
	return {
		type: SET_SERVICEPERSONAL_DATA,
		payload: {
			data: data
		}
	}
}

export function updateServicePersonalData(data) {
	return {
		type: UPDATE_SERVICEPERSONAL_DATA,
		payload: {
			data: data
		}
	}
}

export function updateServicePersonalDataSuccess(data) {
	return {
		type: UPDATE_SERVICEPERSONAL_DATA_SUCCESS,
		payload: {
			data: data
		}
	}
}

export function updateServicePersonalDataError(error) {
	return {
		type: UPDATE_SERVICEPERSONAL_DATA_ERROR,
		payload: {
			error: error
		}
	}
}