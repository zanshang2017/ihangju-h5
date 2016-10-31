import 'whatwg-fetch';  // https://github.github.io/fetch/
import {Env} from './env.js';
import signals from 'containers/App/signals';

import Toast from 'antd-mobile/lib/toast';

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
        .catch((err) => {
            //todo 采集
            console.error('url:', url, 'options:', options);
            if (url.indexOf('zan-shang') < 0) { // 赞赏退出错误不提示,等待接口优化
                //todo 通过navigator.onLine获取网络状态
                Toast.fail('数据加载失败,请检查网络!');
            }
        });
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
        console.log('未登录,跳转到登录页');
        signals.onUnLogin.dispatch();
        return;
    }

    // 服务端错误,请联系后台开发人员
    if (response.status === 405) {
        //todo 采集 通知405
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
