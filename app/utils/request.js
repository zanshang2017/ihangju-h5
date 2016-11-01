import 'whatwg-fetch';  // https://github.github.io/fetch/
import {Env} from './env.js';
import signals from 'containers/App/signals';
import {feedbackLog} from 'utils/feedbackLog';

import Toast from 'antd-mobile/lib/toast';

/**
 * 请求url，返回promise.
 * @param  {string} url
 * @param  {object} [options]
 * @return {object}
 */
export default function request(url, options) {

    Env.debug && console.log('options', options);

    var _fetch = {};

    try {
        _fetch = fetch(url, options)
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => ({data}))
            .catch((err) => {

                //采集错误信息
                console.error('url:', url, 'options:', options);

                if (!isIgnoreDomain(url)) { // 赞赏退出错误不提示,等待接口优化
                    feedbackLog.addLog({
                        url: url,
                        desc: '接口请求失败',
                        err: JSON.stringify(err),
                        options: JSON.stringify(options),
                        type: feedbackLog.type.ERROR
                    });

                    if (navigator.onLine) {
                        Toast.fail('数据加载失败,请稍后再试!');
                    } else {
                        Toast.fail('数据加载失败,请检查网络!');
                    }
                }
            });
    } catch (e) {
    }

    return _fetch;
}

/**
 * 过滤不需要提交错误的域名,这些接口由于各种原因没能返回正确数据但不影响流程
 * @param url
 * @returns {boolean}
 */
function isIgnoreDomain(url) {
    var ignoreErrorWhiteList = [
        'zan-shang', //三方登录接口,未做指定的接口来处理退出,会有跨域报错
        '33:7777' //公司测试机
    ];

    if (url) {
        for (let i = 0, len = ignoreErrorWhiteList.length; i < len; i++) {
            if (url.indexOf(ignoreErrorWhiteList[i]) > -1) {
                return true;
            }
        }
    }

    return false;
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
    // todo 405先当做403处理,后面待服务端改好要去掉!
    if (response.status === 403 || response.status === 405) {
        console.log('未登录,跳转到登录页');
        try {
            Toast.hide();
        }catch(e){}

        signals.onUnLogin.dispatch();

        return;
    }

    // 服务端错误,请联系后台开发人员
    if (response.status === 405) {
        //todo 采集 通知405

        return;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
