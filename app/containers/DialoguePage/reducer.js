/*
 *
 * DialoguePage reducer
 *
 */

import {
    fromJS,
} from 'immutable';

import {
    DEFAULT_ACTION,

    LOAD_DIALOGUE_DATA,
    LOAD_DIALOGUE_DATA_SUCCESS,
    LOAD_DIALOGUE_DATA_ERROR,

    SEND_DIALOGUE_DATA,
    SEND_DIALOGUE_DATA_SUCCESS,
    SEND_DIALOGUE_DATA_ERROR,

    SET_DIALOGUE_DATA_STATUS,
    RESET_STATE,

} from './constants';

import {
    LOGOUT_SUCCESS,
} from 'containers/App/constants';

const initialState = fromJS({
    dialogue: fromJS({
        data: false,
        page: 0,
        isLast: false,
        loading: false,
        sending: false,
    })
});

function DialoguePageReducer(state = initialState, action = {}) {

    var data = null,
        page = null,
        dialogueData = null,
        _state = null;

    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_DIALOGUE_DATA:
            return state.setIn(['dialogue', 'loading'], true);

        case LOAD_DIALOGUE_DATA_SUCCESS:
            data = action.payload.data;
            return state.setIn(['dialogue', 'data'], fromJS(data)).setIn(['dialogue', 'loading'], false);

        case LOAD_DIALOGUE_DATA_ERROR:
            return state.setIn(['dialogue', 'loading'], false);

        case SEND_DIALOGUE_DATA:
            return state.setIn(['dialogue', 'sending'], true);

        case SEND_DIALOGUE_DATA_SUCCESS:
            dialogueData = action.payload.dialogueData;
            let insertedData = state.getIn(['dialogue', 'data']).unshift(fromJS(dialogueData));
            return state.setIn(['dialogue', 'data'], insertedData);

        case SEND_DIALOGUE_DATA_ERROR:
            return state.setIn(['dialogue', 'sending'], false);

        case SET_DIALOGUE_DATA_STATUS:
            var data = action.payload;

            if (typeof data.loading !== 'undefined' && typeof data.loading === 'boolean') {
                state = state.setIn(['dialogue', 'loading'], data.loading);
            }

            return state;

        case RESET_STATE:
            return initialState;

        case LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}

/**
 * 将数据插入匹配的state节点
 *
 * @param originData
 * @param id
 * @param data
 */
function insertData(originData, id, data) {
    let found = false;
    originData = originData.toJS();

    for (let i = 0, l = originData.length; i < l; i++) {
        let item = originData[i];

        if (item.id == id) {
            item.answers.push(data);
            break;
        }

        if (item.answers.length > 0) {
            for (let ii = 0, ll = item.answers.length; ii < ll; ii++) {
                let _item = item.answers[ii];
                if (_item.id == id) {
                    found = true;
                    item.answers.push(data);
                    break;
                }
            }
        }

        if (found) {
            break;
        }
    }

    return fromJS(originData);
}


export default DialoguePageReducer;
