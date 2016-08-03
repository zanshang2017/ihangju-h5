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
 * @param separater 时间分隔符
 * @returns {string}
 */
function convertDate(t, separator, isOnlyShowDate) {
    var separator = separator || '-';

    var ONE_MINUTE = 60,
        ONE_HOUR = ONE_MINUTE * 60,
        ONE_DAY = ONE_HOUR * 24,
        ONE_MONTH = ONE_DAY * 30;

    var msd = Date.now() - t;
    msd = msd > 0 ? msd : 0;
    var time = parseFloat(msd) / 1000; // to second
    var ret = '';
    var d = new Date(t);

    if (isOnlyShowDate) {
        ret = getDateString();
    } else {
        if (time != null && time != "") {
            if (time < ONE_MINUTE) {
                ret = "1分钟前";
            } else if (time >= ONE_MINUTE && time < ONE_HOUR) {
                ret = parseInt(time / ONE_MINUTE) + "分钟前";
            } else if (time >= ONE_HOUR && time < ONE_DAY) {
                ret = parseInt(time / ONE_HOUR) + "小时前";
            } else if (time >= ONE_DAY && time < ONE_MONTH) {
                ret = parseInt(time / ONE_DAY) + "天前";
            } else {
                ret = getDateString();
            }
        }
    }

    function getDateString() {
        return [
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDate()
        ].join(separator);
    }

    return ret;
}

export {
    getUrlParam,
    convertDate
};