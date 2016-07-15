import 'whatwg-fetch';  // https://github.github.io/fetch/
import { Env } from './env.js';

/**
 * 请求url，返回promise.
 * @param  {string} url
 * @param  {object} [options]
 * @return {object}
 */
export default function request(url, options) {

    Env.debug && console.debug('options', options);

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
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
