/**
 * DemoPage sagas
 *
 * 用于异步action
 */

import 'babel-polyfill';

/* eslint-disable no-constant-condition */

import { take, call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { LOADLIST } from 'containers/DemoPage/constants';
import { loadListSuccess, loadListError } from 'containers/DemoPage/actions';

import request from 'utils/request';

//将所有的sagas导出
export default [
    getGithubData,
];

export function* getGithubData() {
    //利用generator实现异步

    yield take(LOADLIST); //关注的action
    // yield* takeEvery(LOADLIST); //关注的action
    const requestURL = 'https://api.github.com/users/jeresig/repos?type=all&sort=updated';

    //发起请求
    const lists = yield call(request, requestURL); //必须返回Promise

    if (lists) {
        //待返回后对response进行判断
        if (lists.err === undefined || lists.err === null) {
            yield put(loadListSuccess(lists.data));
        } else {
            console.log(lists.err.response); // eslint-disable-line no-console
            yield put(loadListError(lists.err));
        }
    }
}
