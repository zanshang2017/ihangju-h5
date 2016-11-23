import {take, takeLatest, call, put, select} from 'redux-saga/effects';
import {
    LOAD_SEARCH_RESULT,
} from 'containers/SearchPage/constants';

import {
    setStatus,
    loadSearchResultSuccess,
    loadSearchResultError
} from 'containers/SearchPage/actions';

import {
    SEARCH_API,
} from '../../apis.js';

import request from 'utils/request';

export default [
    getSearchResutl
];

export function* getSearchResutl() {

    let action = null;

    while (action = yield take(LOAD_SEARCH_RESULT)) {

        let page = action.payload.page || 0;
        let size = action.payload.size || 10;
        let keyword = encodeURIComponent(action.payload.keyword || '');

        console.log('keyword', keyword);

        let url = SEARCH_API + `?content=${keyword}&page=${page}&size=${size}`;

        const lists = yield call(request, url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        // {
        //     "result": {
        //     "projects": [],
        //         "users": [],
        //         "tags": []
        // },
        //     "code": "ok"
        // }

        if (lists) {
            let _status = {
                isProjectsLast: true,
                isUsersLast: true,
                isTagsLast: true
            };

            if (lists.err === undefined || lists.err === null) {
                if (lists.data.result) {
                    let result = lists.data.result;

                    //返回的条数可能多于size数
                    if(result.projects && result.projects.length >= size) {
                        _status.isProjectsLast = false;
                    }

                    if(result.users && result.users.length >= size) {
                        _status.isUsersLast = false;
                    }

                    if(result.tags && result.tags.length >= size) {
                        _status.isTagsLast = false;
                    }

                    _status.page = page;

                    yield [put(loadSearchResultSuccess(lists.data, page)), put(setStatus(_status))];

                } else {
                    yield put(setStatus(_status));
                }
            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(loadSearchResultError(lists.err));
            }
        }
    }
}


