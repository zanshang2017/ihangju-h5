import {take, call, put, select} from 'redux-saga/effects';

import {
    LOAD_PERSON_DATA,
    SET_FOLLOW_USER,
} from './constants';

import {
    loadPersonDataSuccess,
    loadPersonDataError,

    setFollowUserSuccess,
    setFollowUserError,
} from './actions'

import signals from './signals';

import {
    USER_PROFILE_API,
    FOLLOW_USER_API,
} from '../../apis.js';

import Toast from 'antd-mobile/lib/toast';

import request from 'utils/request';

export default [
    getPersonData,
    setFollowUser,
];

export function* getPersonData() {

    let action = null;

    while (action = yield take(LOAD_PERSON_DATA)) {

        let id = action.payload.id || '';

        if (id) {
            let url = USER_PROFILE_API + id;
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
                    yield put(loadPersonDataSuccess(lists.data.result));
                } else {
                    console.log(lists.err.response); // eslint-disable-line no-console
                    yield put(loadPersonDataError(lists.err));
                }
            }
        } else {
            yield put(loadPersonDataError(new Error('缺少用户id')));
        }

    }
}


export function* setFollowUser() {

    let action = null;
    while (action = yield take(SET_FOLLOW_USER)) {
        let id = action.payload.id;
        let isToFollow = action.payload.isToFollow;
        let url = FOLLOW_USER_API + `${id}`;

        let method = isToFollow ? 'PUT' : 'DELETE';

        console.log(url, method);

        const lists = yield call(request, url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        if(lists) {
            if ((lists.err === undefined || lists.err === null) && (lists.data && lists.data.code === 'ok')) {
                yield put(setFollowUserSuccess(id, isToFollow));

                let notice = isToFollow ? '关注成功!' : '已取消关注!';
                try {
                    Toast.hide();
                    Toast.success(notice, 2, function () {
                        signals.followRequestComplete.dispatch();
                    });
                } catch (e) {
                }


            } else {
                console.log(lists.err.response); // eslint-disable-line no-console
                yield put(setFollowUserError(lists.err));

                let notice = isToFollow ? '关注失败!' : '取消关注失败!';
                try {
                    Toast.hide();
                    Toast.fail(notice, 2, function () {
                        signals.followRequestComplete.dispatch();
                    });
                } catch (e) {
                }
            }
        }
    }
}