/**
 * Created by Howard on 16/7/18.
 */

function noop(){}

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
        moveDist = Math.floor(leastDist / 2);
        goDist = moveDist + nParent.scrollTop;
        leastDist = allDistance - goDist;

        if (leastDist <= 1 || moveDist <= 1) {
            goDist = allDistance;
            setScrollTop(goDist);
        } else {
            setScrollTop(goDist);
            setTimeout(function () {
                // console.log('goDist', goDist, leastDist);
                f();
            }, 10);
        }
    })();
}

function goTop(nParent, noAnim) {
    var moveDist = 0;

    if (noAnim) {
        setScrollTop(0);
        return;
    }

    (function f() {
        // debugger;
        moveDist = Math.floor(nParent.scrollTop / 2);

        if (moveDist <= 1) {
            nParent.scrollTop = 0;
        } else {
            nParent.scrollTop = moveDist;
            setTimeout(function () {
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
function unique(array) {
    var n = [];
    for (var i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}


/**
 * guid
 * @returns {{generate: generate}}
 */
function guid() {
    var defaultMode = '**-*-*-*-**';

    function s4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return {
        //传入模式字符串, 一个通配符对应4位16进制随机数.
        //如: *-*-** --> 07b6-78b4-aa5aa3c1
        //默认将以标准GUID(UUID)规范输出： "ee812a81-2461-bb9b-1cdf-fdce551abb9e"
        generate: function (mode) {
            if (typeof mode == 'string' && mode.indexOf('*') > -1) {
                defaultMode = mode;
            }

            return defaultMode.replace(/\*/g, s4);
        }
    };
}

/**
 * 比较版本号
 *
 *  -1  : v1 < v2
 *  1   : v1 > v2
 *  0   : v1 == v2
 *
 * @param relVersion
 * @param digit
 * @returns {number}
 */
function compareVersion(v1, v2, digit) {

    if (!v1) {
        return -1;
    }

    if (v1 == v2) {
        return 0;
    }

    var v = v1.split('.'),
        r = v2.split('.'),
        d = digit || v.length,
        i = -1;

    while (++i < d) {
        var _v = Number(v[i]) || 0,
            _r = Number(r[i]) || 0;

        if (_v > _r) {
            return 1;
        } else if (_v < _r) {
            return -1;
        }
    }

    return 0;
}


const CLIENT_WIDTH = Math.floor(document.documentElement.clientWidth * (window.devicePixelRatio ? window.devicePixelRatio
 : 1));
//图片尺寸配置
const IMAGE_SIZE_TYPE = {
    AVATAR: '?imageMogr2/auto-orient/thumbnail/120x120/quality/70',
    AVATAR_BIG: '?imageMogr2/auto-orient/thumbnail/250x250/quality/70',
    AVATAR_SMALL: '?imageMogr2/auto-orient/thumbnail/60x60/quality/70',

    TAG_IMAGE: '?imageMogr2/quality/70',
    BANNER_IMAGE: '?imageMogr2/quality/75',

    PROJ_COVER: '?imageMogr2/auto-orient/thumbnail/140x184/quality/70',
    PORJ_CONTENT_IMG: `?imageMogr2/auto-orient/thumbnail/${CLIENT_WIDTH}x/quality/70`,

    WEBP: '/format/webp',
};

/**
 *  增加千牛图片处理参数 imageMogr2
 */
function addImageParam(url, sizeTypeStr) {
    if (url.indexOf('?') > -1) {
        url = url.substr(0, url.indexOf('?'));
    }

    if (sizeTypeStr) {
        url += (sizeTypeStr.indexOf('?') > -1 ? sizeTypeStr : '?' + sizeTypeStr);
    }

    if (localStorage.getItem('isSupportWebp') === 'true') {
        url += ((url.indexOf('?') > -1) ? IMAGE_SIZE_TYPE.WEBP : '?imageMogr2' + IMAGE_SIZE_TYPE.WEBP);
    }

    return url;
}

function testSupportWebp(exec) {
    var img = new Image(), loaded, _isSupport;
    if (window.localStorage && window.localStorage.hasOwnProperty('isSupportWebp')) {
        _isSupport = localStorage.getItem('isSupportWebp') == 'true' ? true : false;
        exec && exec(_isSupport);
        return;
    }
    img.onload = img.onerror = function () {
        if (!loaded) {
            loaded = true;

            if(img.width === 2 && img.height === 2) {
                _isSupport = true;
            }
            exec && exec(_isSupport);
            window.localStorage && window.localStorage.setItem('isSupportWebp', _isSupport);
        }
    };
    setTimeout(function () {
        if (!loaded) {
            loaded = true;
            exec && exec(false);
            window.localStorage && window.localStorage.setItem('isSupportWebp', false);
        }
    }, 16);
    img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}


function goBackHelper(handler) {
    if(!!(window.history && history.pushState)) {
        window.addEventListener('hashchange', handler, false);

        return {
            remove: function(){
                window.removeEventListener('hashchange', handler, false);
            }
        }
    } else {
        return {
            remove: noop
        }
    }
}

//登录用户会写入locstorage
function isLogin() {
    return !!JSON.parse(locStorage.get('userInfo'));
}

//阅读页面埋点 秒转时间
function secondsTotime(seconds) {
    var ONE_MINUTE = 60,
        ONE_HOUR = ONE_MINUTE * 60,
        ONE_DAY = ONE_HOUR * 24,
        ONE_MONTH = ONE_DAY * 30,
        ONE_YEAR = ONE_MONTH * 12;
    var time = seconds;
    var ret = '';
    if (time != null && time != "") {
        if (time < ONE_MINUTE) {
            ret = time + '秒';
        } else if (time >= ONE_MINUTE && time < ONE_HOUR) {
            ret = parseInt(time / ONE_MINUTE) + "分钟";
        } else if (time >= ONE_HOUR && time < ONE_DAY) {
            ret = parseInt(time / ONE_HOUR) + "小时";
        } else if (time >= ONE_DAY && time < ONE_MONTH) {
            ret = parseInt(time / ONE_DAY) + "天";
        } else if (time >= ONE_MONTH && time < ONE_YEAR) {
            ret = parseInt(time / ONE_MONTH) + "个月";
        } else if (time >= ONE_YEAR && time < ONE_YEAR * 15) {
            ret = parseInt(time / ONE_YEAR) + "年";
        } else {
            ret = 'N年'
        }
    }
    return ret;
}


export {
    getUrlParam,
    convertDate,
    locStorage,
    goTop,
    goBottom,
    unique,
    guid,
    compareVersion,
    IMAGE_SIZE_TYPE,
    testSupportWebp,
    addImageParam,
    goBackHelper,
    isLogin,
    secondsTotime,
};