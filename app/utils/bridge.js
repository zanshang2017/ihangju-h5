/**
 * Created by howard on 16/6/6.
 * 调用客户端API
 */

var IOS = 'ios',
    ANDROID = 'android';

var ua = navigator.userAgent;

/**
 * @example
 * var bridge = new Bridge('ihangju_webview_bridge');
 */
var Bridge = function () {
    this.init.apply(this, arguments);
};

Bridge.prototype = {
    noop: function () {},

    //设备信息
    device: {},

    /**
     * @private
     * @desc 初始化方法
     * @param bridgeName {String} 自定义桥名称
     */
    init: function (bridgeName) {
        var that = this;

        that.bridgeName = bridgeName || 'ihangju_webview_bridge';
        that.bridge = window[that.bridgeName];
        that.getDeviceInfo();

        that.sys.superthat = that;
        that.share.superthat = that;
    },

    /**
     * @method
     * @memberof Bridge#
     * @desc 获取设备信息
     * @returns {Bridge#DeviceInfo} 设备信息
     */
    getDeviceInfo: function _getDeviceInfo_() {
        if (/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua)) {
            this.device.type = IOS;

            var iosVersion = /\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/.exec(ua);
            if (iosVersion && iosVersion[0]) {
                this.device.version = iosVersion[0].replace(/_/g, '.');
            }
        } else if (/Android/i.test(ua)) {
            this.device.type = ANDROID;
            var match = ua.match(/Android\s+([\d\.]+)/i);
            this.device.version = match[1];
        } else {
            this.device.type = undefined;
        }
    },

    // 主要API，用于页面同客户端的协议回调，通过URI SCHEME进行H5与Native的通信
    // - `name` scheme name，协议默认为`sbridge:`，可以省略不传
    // - `path` 为协议约定的访问路径，如`QRReader`，`share.Weibo`
    // - `params` 对应scheme的query参数部分，为调用时传递给客户端的所需数据对象，对象内可包含`callback`等，具体以各接口所需参数为准
    pushBack: function (name, path, params) {

        //console.log(name, path, params);

        var uri = (name || 'sbridge:') + '//' + path + '/?';
        var args = [].slice.call(arguments);
        var searchParams = '';

        if (typeof(name) !== 'string' || typeof(path) !== 'string') {
            name = 'sbridge:';
            path = args[0];
            params = args[1];
            uri = (name || 'sbridge:') + '//' + path + '/?';
        }
        params = params || {};

        for (var i in params) {
            if (params.hasOwnProperty(i)) {
                if (typeof(params[i]) === 'function') {
                    params[i] = buildCallback(params[i]);
                }
                searchParams += (searchParams.length === 0 ? '':'&') + i + '=' + encodeURIComponent(params[i]);
            }
        }

        uri += searchParams;
        this.sendUriScheme(uri);
    },

    // 发送uri scheme
    // - @param {string} uri
    sendUriScheme: function (uri) {
        var proxy = this.mClientProxy;

        if (proxy) {
            proxy.setAttribute('src', uri);
        } else {
            proxy = buildProxy(uri);
        }

        this.mClientProxy = proxy;

        return this;
    },

    sys: {
        //'sbridge://QRReader/?callback=cb'
        qrReader: function (fn) {
            var that = this.superthat;
            that.pushBack('sbridge:', 'QRReader', {
                callback: fn || that.noop
            });
        },

        //sbridge://Camera/?callback=cb
        camera: function (fn) {
            var that = this.superthat;
            that.pushBack('sbridge:', 'Camera', {
                callback: fn || that.noop
            });
        },

        //sbridge://Camera/?callback=cb
        quit: function (fn) {
            var that = this.superthat;
            that.pushBack('sbridge:', 'Quit', {
                callback: fn || that.noop
            });
        }
    },

    share: {
        //sbridge://share.Weibo/?text=ShareText&callback=cb
        weibo: function (shareText, fn) {
            var that = this.superthat;
            that.pushBack('sbridge:', 'share.Weibo', {
                callback: fn || that.noop,
                text: shareText || ''
            });
        },

        //sbridge://share.Wechat/?url=http%3A%2F%2Fwww.baidu.com&title=Title&desc=Description&callback=cb
        wechat: function (url, title, desc, thumb, fn) {
            var that = this.superthat;
            that.pushBack('sbridge:', 'share.Wechat', {
                callback: fn || that.noop,
                url: url || '',
                title: title || '',
                desc: desc || '',
                thumb: thumb || ''
            });
        },

        //sbridge://share.WechatTimeline/?url=http%3A%2F%2Fwww.baidu.com&title=Title&desc=Description&thumb=https%3A%2F%2Fwww.baidu.com%2Fimg%2Fbaidu_jgylogo3.gif&callback=cb
        wechatTimeline: function (url, title, desc, thumb, fn) {
            var that = this.superthat;
            that.pushBack('sbridge:', 'share.WechatTimeline', {
                callback: fn || that.noop,
                url: url || '',
                title: title || '',
                desc: desc || '',
                thumb: thumb || ''
            });
        }

    }

};

// 构建回调
// - 客户端目前只能支持挂载到全局下的callback
// - @param {function}fn 实际要执行的回调方法
// - @param {boolean}isAlwaysAvailable 是否一直可用。因为在有些事件绑定机制下，生成的callback需要持久可用，不能销毁。
// - @return {string} callback name，挂载到window上的。
function buildCallback(fn, isAlwaysAvailable) {
    var guid = buildRandom(),
        callbackName = 'Bridge_Callbacks_' + (isAlwaysAvailable ? 'always_' : '') + guid;

    window[callbackName] = (function (cb, callbackName) {
        return function () {
            cb.apply(this, arguments);
            !isAlwaysAvailable && delete window[callbackName];
        };
    })(fn, callbackName);

    return callbackName;
}

function buildRandom() {
    var random = new Date().getTime() + '_' + parseInt(Math.random() * 1000000);
    return random;
}

// 创建代理发起uri请求
function buildProxy(uri) {
    var guid = buildRandom();
    var proxy = document.createElement('iframe');

    proxy.id = 'BridgeClientProxy_' + guid;
    proxy.src = uri;
    proxy.style.cssText = 'width:0;height:0;opacity:0;display:none;';

    document.body.appendChild(proxy);
    return proxy;
}

// 提供Global桥
//Bridge.Global = new Bridge();
//global.Bridge = Bridge;
var bridge = new Bridge();

//导出Bridge实例
export default bridge;

