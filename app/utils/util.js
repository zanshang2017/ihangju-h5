/**
 * Created by Howard on 16/7/18.
 */

function getUrlParam(param, uri) {
    var value;

    uri = uri || window.location.href;
    uri = uri.match('#') ? uri.split('#')[1] : uri;
    value = uri.match(new RegExp('[\?\&]' + param + '=([^\&\#]*)([\&\#]?)', 'i'));

    return value ? decodeURIComponent(value[1]) : value;
}

/**
 * 返回转换后的日期文本
 *
 * @param t 时间毫秒值
 * @param modelString 模式
 */
function convertDate(t, modelString) {
    var ONE_MINUTE = 60,
        ONE_HOUR = ONE_MINUTE * 60,
        ONE_DAY = ONE_HOUR * 24,
        ONE_MONTH = ONE_DAY * 30,
        ONE_YEAR = ONE_MONTH * 12;
    var msd = Date.now() - t;
    msd = msd > 0 ? msd : 0;
    var time = parseFloat(msd) / 1000; // to second
    var ret = '';
    var d = new Date(t);

    if (modelString) {
        ret = getDateString(modelString);
    } else {
        if (time != null && time != "") {
            if (time < ONE_MINUTE) {
                ret = "刚刚";
            } else if (time >= ONE_MINUTE && time < ONE_HOUR) {
                ret = parseInt(time / ONE_MINUTE) + "分钟前";
            } else if (time >= ONE_HOUR && time < ONE_DAY) {
                ret = parseInt(time / ONE_HOUR) + "小时前";
            } else if (time >= ONE_DAY && time < ONE_MONTH) {
                ret = parseInt(time / ONE_DAY) + "天前";
            } else if (time >= ONE_MONTH && time < ONE_YEAR) {
                ret = parseInt(time / ONE_MONTH) + "个月前";
            } else if (time >= ONE_YEAR && time < ONE_YEAR * 15) {
                ret = parseInt(time / ONE_YEAR) + "年前";
            } else {
                ret = 'N年前'
            }
        }
    }

    function getDateString(modelString) {
        /**
         * 字符模式:
         *      YYYY: 年
         *      MM: 月
         *      DD: 日
         *      hh: 小时
         *      mm: 分钟
         *      ss: 秒
         */
        var _r = /\d?(\d{2})/;
        var _ret = modelString || 'YYYY-MM-DD hh:mm:ss';
        var _d = {
            'YYYY': d.getFullYear(),
            'MM': ('0' + (d.getMonth() + 1)).replace(_r, '$1'),
            'DD': ('0' + d.getDate()).replace(_r, '$1'),
            'hh': ('0' + d.getHours()).replace(_r, '$1'),
            'mm': ('0' + d.getMinutes()).replace(_r, '$1'),
            'ss': ('0' + d.getSeconds()).replace(_r, '$1')
        };

        for (var k in _d) {
            _ret = _ret.replace(k, _d[k]);
        }

        return _ret;
    }

    return ret;
}

/**
 * localStorage
 * @type {{set, get, keys, removeItem, isSupport}}
 */
var locStorage = (function storageFactory() {
    var supportLocalStorage = (function () {
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    })();

    var supportSessionStorage = (function () {
        var test = 'test';
        try {
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    })();

    return {
        /**
         * locStorage util
         */
        set: function (key, value) {
            if (supportLocalStorage) {
                localStorage.setItem(key, value);
            } else if (supportSessionStorage) {
                sessionStorage.setItem(key, value);
            }
        },
        get: function (key) {
            if (supportLocalStorage) {
                return localStorage.getItem(key);
            } else if (supportSessionStorage) {
                return sessionStorage.getItem(key);
            }
        },
        keys: function () {
            var arr = [];

            for (var i = 0; i < localStorage.length; i++) {
                arr.push(localStorage.key(i));
            }

            return arr;
        },
        removeItem: function (key) {
            if (supportLocalStorage) {
                return localStorage.removeItem(key);
            } else if (supportSessionStorage) {
                return sessionStorage.removeItem(key);
            }
        },
        isSupport: function (key) {
            return supportLocalStorage || supportSessionStorage;
        }
    }
})();

function goBottom(nParent, nChild, noAnim) {
    var parentHeight = nParent.getBoundingClientRect().height;
    var childHeight = nChild.getBoundingClientRect().height;

    console.log(parentHeight, childHeight);

    var allDistance = childHeight - parentHeight;
    var leastDist = allDistance;
    var moveDist = 0;
    var goDist = 0;

    if (noAnim) {
        setScrollTop(childHeight - parentHeight);
        return;
    }

    function setScrollTop(d) {
        nParent.scrollTop = d;
    }

    (function f() {
        // debugger;
        moveDist = Math.floor(leastDist / 3);
        goDist = moveDist + nParent.scrollTop;
        leastDist = allDistance - goDist;

        if (leastDist <= 1 || moveDist <= 1) {
            goDist = allDistance;
            setScrollTop(goDist);
        } else {
            setScrollTop(goDist);
            setTimeout(function () {
                console.log('goDist', goDist, leastDist);
                f();
            }, 10);
        }
    })();
}

/**
 * 返回去重后的数组
 *
 * @param array 数组
 */
function unique(array){
    var n = [];
    for(var i = 0;i < array.length; i++){
        if(n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}

export {
    getUrlParam,
    convertDate,
    locStorage,
    goBottom,
    unique,
};