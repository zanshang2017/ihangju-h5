/**
 * Created by Howard on 2016/10/31.
 */

import 'whatwg-fetch';  // https://github.github.io/fetch/
import request from 'utils/request';
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
        o.time = time;
        o.timeString = d.toLocaleString();
        o.platform = "h5_ihangju";
        o.OS = Env.platform.android ? 'android' : (Env.platform.ipad || Env.platform.iphone) ? 'ios' : 'web';
        o.shell = Env.shell || '';
        o.UA = window.navigator.userAgent;
        o.onLine = navigator.onLine;
        locStorage.set(key, JSON.stringify(o));
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
        var that = this;
        var logs = {};
        var formData = new FormData();

        for (var i = 0, len = keys.length; i < len; i++) {
            logs[keys[i]] = locStorage.get(keys[i]);
        }

        formData.append('file', new Blob([JSON.stringify(logs)]));
        // formData.append('file', JSON.stringify(logs));
        // formData.append('data', JSON.stringify(logs));

        console.log('发送LOG:', logs, formData.values());

        fetch(feedbackApi, {
            method: 'POST',
            data: formData,
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                // 'Content-Type': undefined,
                // 'Content-Type': 'multipart/form-data',
                'X-API-Version': 'v1.1'
            },
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

    },

    //不断查询localstorage里有无新log,存在就尝试发送,成功后清除本地缓存,并继续检查
    doListen: function () {
        logTimer && clearInterval(logTimer);
        logTimer = setTimeout(this.logHandler.bind(this), delay);
    },

    logHandler: function () {
        var keys = locStorage.keys();
        var logKeys = [];
// debugger;
        for (var i = 0, len = keys.length; i < len; i++) {
            if (keys[i] && keys[i].match(regKey)) {
                logKeys.push(keys[i]);
            }
        }

        console.log(logKeys);

        if (logKeys && logKeys.length > 0) {
            this.sendLogs(logKeys);
        } else {
            logTimer = setTimeout(this.logHandler.bind(this), 3000);
        }

    }
}

export {
    feedbackLog
};