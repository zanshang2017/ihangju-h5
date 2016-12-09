/*
 *
 * DialoguePage constants
 *
 */

export const DEFAULT_ACTION = 'app/DialoguePage/DEFAULT_ACTION';

export const LOAD_DIALOGUE_DATA = 'app/DialoguePage/LOAD_DIALOGUE_DATA';
export const LOAD_DIALOGUE_DATA_SUCCESS = 'app/DialoguePage/LOAD_DIALOGUE_DATA_SUCCESS';
export const LOAD_DIALOGUE_DATA_ERROR = 'app/DialoguePage/LOAD_DIALOGUE_DATA_ERROR';

export const SEND_DIALOGUE_DATA = 'app/DialoguePage/SEND_DIALOGUE_DATA';
export const SEND_DIALOGUE_DATA_SUCCESS = 'app/DialoguePage/SEND_DIALOGUE_DATA_SUCCESS';
export const SEND_DIALOGUE_DATA_ERROR = 'app/DialoguePage/SEND_DIALOGUE_DATA_ERROR';

export const GET_LETTERGROUP_ID = 'app/DialoguePage/GET_LETTERGROUP_ID';
export const GET_LETTERGROUP_ID_SUCCESS = 'app/DialoguePage/GET_LETTERGROUP_ID_SUCCESS';
export const GET_LETTERGROUP_ID_ERROR = 'app/DialoguePage/GET_LETTERGROUP_ID_ERROR';

export const GET_AGREEMENT_STATUS = 'app/DialoguePage/GET_AGREEMENT_STATUS';
export const GET_AGREEMENT_STATUS_SUCCESS = 'app/DialoguePage/GET_AGREEMENT_STATUS_SUCCESS';

export const SET_DIALOGUE_DATA_STATUS = 'app/DialoguePage/SET_DIALOGUE_DATA_STATUS';
export const RESET_STATE = 'app/DialoguePage/RESET_STATE';

/**
 * 服务端返回的签约状态
 * @type {{authorize_pending: {desc: string}, authorize_affirmance: {desc: string}, authorize_refusal: {desc: string}}}
 */
export const AGREEMENT_STATUS = {
    'authorize_pending': {
        desc: '等待作者同意'
    },
    'authorize_affirmance': {
        desc: '已签约'
    },
    'authorize_refusal': {
        desc: '已拒绝'
    }
};

