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

export function defaultAction() {
	return {
		type: DEFAULT_ACTION,
	}
}

export function loadAuthorAttestData(id = null) {
	return {
		type: LOAD_AUTHORATTEST_DATA,
		payload: {
			id: id
		}
	};
}

export function loadAuthorAttestDataSuccess(data) {
	return {
		type: LOAD_AUTHORATTEST_DATA_SUCCESS,
		payload: {
			data: data
		}
	}
}

export function loadAuthorAttestDataError(error) {
	return {
		type: LOAD_AUTHORATTEST_DATA_ERROR,
		payload: {
			error: error
		}
	}
}

export function setAuthorAttestData(data) {
	return {
		type: SET_AUTHORATTEST_DATA,
		payload: {
			data: data
		}
	}
}

export function updateAuthorAttestData(data) {
	return {
		type: UPDATE_AUTHORATTEST_DATA,
		payload: {
			data: data
		}
	}
}

export function updateAuthorAttestDataSuccess(data) {
	return {
		type: UPDATE_AUTHORATTEST_DATA_SUCCESS,
		payload: {
			data: data
		}
	}
}

export function updateAuthorAttestDataError(error) {
	return {
		type: UPDATE_AUTHORATTEST_DATA_ERROR,
		payload: {
			error: error
		}
	}
}