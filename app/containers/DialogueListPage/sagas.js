import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_DIALOGUE_LIST_DATA,
} from './constants';

import {
    loadDialogueListDataSuccess,
    loadDialogueListDataError,
} from './actions'

import {
    USER_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getDialogueLists,
];

export function* getDialogueLists() {

    let action = null;
    while (action = yield take(LOAD_DIALOGUE_LIST_DATA)) {

        let id = action.payload.id;
        // let page = action.payload.page || 0;
        // let size = 10;
        let url = USER_API + `${id}/dialogues`; //暂无分页

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if (lists) {
            if ((lists.err === undefined || lists.err === null) && (lists.data.result && lists.data.code === 'ok')) {
                yield put(loadDialogueListDataSuccess(lists.data.result));
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(loadDialogueListDataError(lists.err));
            }
        }
    }
}
