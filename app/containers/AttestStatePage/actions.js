import {
	DEFAULT_ACTION,

	LOAD_ATTESTSTATE_DATA,
	LOAD_ATTESTSTATE_DATA_SUCCESS,
	LOAD_ATTESTSTATE_DATA_ERROR,

	LOAD_HELP_DATA,
	LOAD_HELP_DATA_SUCCESS,
	LOAD_HELP_DATA_ERROR,

} from './constants';

export function defaultAction() {
	return {
		type: DEFAULT_ACTION,
	}	
}

export function loadAttestStateData(id = null) {
	return {
		type: LOAD_ATTESTSTATE_DATA,
		payload: {
			id: id
		}
	}
}

export function loadAttestStateDataSuccess(data) {
	return {
		type: LOAD_ATTESTSTATE_DATA_SUCCESS,
		payload: {
			data: data
		}
	}
}

export function loadAttestStateDataError(error) {
	return {
		type: LOAD_ATTESTSTATE_DATA_ERROR,
		payload: {
			error: error
		}
	}
}

export function loadHelpData() {
	return {
		type: LOAD_HELP_DATA
	}
}

export function loadHelpDataSuccess(data) {
	return {
		type: LOAD_HELP_DATA_SUCCESS,
		payload: {
			data: data
		}
	}
}

export function loadHelpDataError(error) {
	return {
		tyep: LOAD_HELP_DATA_ERROR,
		payload: {
			error: error
		}
	}
}