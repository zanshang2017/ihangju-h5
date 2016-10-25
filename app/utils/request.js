import 'whatwg-fetch';  // https://github.github.io/fetch/
import {Env} from './env.js';
import signals from 'containers/App/signals';

/**
 * 请求url，返回promise.
 * @param  {string} url
 * @param  {object} [options]
 * @return {object}
 */
export default function request(url, options) {

    Env.debug && console.log('options', options);

    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ({data}))
        .catch((err) => ({err}));
}

/**
 * Parse json
 * @param  {object}
 * @return {object}
 */
function parseJSON(response) {
    return response.json();
}

/**
 * 检查返回值
 * @return {object|undefined} 返回包装后的数据
 */
function checkStatus(response) {

    // 正常返回
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    // 重新登录
    if (response.status === 403) {
        //todo 记录当前页面url,登录后跳回
        console.log('未登录,跳转到登录页');
        signals.onUnLogin.dispatch();
        return;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
