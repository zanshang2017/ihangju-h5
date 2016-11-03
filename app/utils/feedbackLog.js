/**
 * Created by Howard on 2016/10/31.
 *
 * 发送错误日志
 */

import 'whatwg-fetch';  // https://github.github.io/fetch/

import {Env} from 'utils/env';
import {
    locStorage
} from 'utils/util';

import {
    FEEDBACKLOG_API
} from 'apis.js';

var logTimer = null;

//上传接口只识别file文件
var feedbackApi = FEEDBACKLOG_API;

var type = {
    LOG: 'log',
    WARN: 'warn',
    ERROR: 'error'
};

var delay = 3000;
var retryTime = 0;

var typeArr = [];
for (var k in type) {
    if (type.hasOwnProperty(k)) {
        typeArr.push(type[k]);
    }
}
var regKey = new RegExp('^' + '(' + typeArr.join('|') + ')\\/[0-9a-zA-Z-]+\\/\\d+$', 'igm');

var feedbackLog = {
    type: type,

    //保存log到ls
    addLog: function (o) {
        var d = new Date();
        var time = d.getTime();

        if (o.type
            && o.type !== type.LOG
            && o.type !== type.WARN
            && o.type !== type.ERROR
            || (!o.type)) {
            o.type = type.LOG;
        }

        var key = o.type + '/' + Env.guid + '/' + time;
        var userInfo = JSON.parse(locStorage.get('userInfo'));
        var deviceToken = locStorage.get('devicetoken') || '';

        if (userInfo) {
            o.uid = userInfo.id || '';
            o.nickName = userInfo.nickName || '';
        }

        o.deviceToken = deviceToken;
        o.time = time;
        o.localTime = d.toLocaleString();
        o.ISOTime = d.toISOString && d.toISOString();
        o.platform = "h5_ihangju";
        o.h5Ver = Env.VERSION;
        o.OS = Env.platform.android ? 'android' : (Env.platform.ipad || Env.platform.iphone) ? 'ios' : 'web';
        o.shell = Env.shell || '';
        o.onLine = (navigator.onLine !== undefined) ? navigator.onLine : undefined;
        o.UA = window.navigator.userAgent;
        locStorage.set(key, JSON.stringify(o));

        debugLog('增加Log:' + JSON.stringify(o));
    },

    //删除指定log
    removeLog: function (keys) {
        if (typeof keys === 'string') {
            locStorage.removeItem(keys);
        } else if (Object.prototype.toString.call(keys) === '[object Array]') {
            for (var i = 0, len = keys.length; i < len; i++) {
                locStorage.removeItem(keys[i]);
            }
        }
    },

    //发送ls中存储的log
    sendLogs: function (keys) {

        //限制最大发送条数
        if (keys && keys.length > 30) {
            keys = keys.slice(0, 30);
        }

        var that = this;
        var logs = {};
        var formData = new FormData();

        for (var i = 0, len = keys.length; i < len; i++) {
            logs[keys[i]] = locStorage.get(keys[i]);
        }

        var blob = new Blob([JSON.stringify(logs)]);
        formData.append('file', blob);

        console.log('发送LOG');
        debugLog('发送LOG');

        try {
            fetch(feedbackApi, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            }).then(function (resp) {
                if (resp.ok) { //HTTP 2xx
                    that.removeLog(keys);
                    retryTime = 0;
                }

                logTimer = setTimeout(that.logHandler.bind(that), delay);
            }, function (error) {
                ++retryTime; //增大发送频率
                logTimer = setTimeout(that.logHandler.bind(that), Math.pow(retryTime, 2) * delay);
            });
        } catch (e) {
            debugLog('feedbackApi send error:' + e);
        }
    },

    //不断查询localstorage里有无新log,存在就尝试发送,成功后清除本地缓存,并继续检查
    doListen: function () {
        logTimer && clearInterval(logTimer);
        logTimer = setTimeout(this.logHandler.bind(this), delay);
    },

    logHandler: function () {
        try {
            var keys = locStorage.keys();
            var logKeys = [];

            for (var i = 0, len = keys.length; i < len; i++) {
                if (keys[i] && keys[i].match(regKey)) {
                    logKeys.push(keys[i]);
                }
            }

            debugLog('logKeys:' + logKeys);

            if (logKeys && logKeys.length > 0) {
                this.sendLogs(logKeys);
            } else {
                logTimer = setTimeout(this.logHandler.bind(this), 3000);
            }
        } catch (e) {
        }
    }
};

export {
    feedbackLog
};