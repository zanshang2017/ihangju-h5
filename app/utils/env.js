/**
 * Created by Howard on 16/6/27.
 */

import {
    guid
} from 'utils/util.js';

import Toast from 'antd-mobile/lib/toast';

const VERSION = window.__APP_CONFIG.ver || 'undefined';

//const PRODUCTION_DOMAIN = /h5app\.ihangju\.com/igm; //todo 测试后记得恢复!
const PRODUCTION_DOMAIN = /h5app\.ihangju\.com|testh5app\.ihangju\.com/igm; //线上域名 或 33测试域名
// const PRODUCTION_DOMAIN = /h5\.dev\.ihangju\.com/igm; //todo 测试后记得恢复!
const PREPUB_DOMAIN = 'preh5app.ihangju.com';

var rDeliveryChannel = /\((.*)\)/ig;

var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
    shell = ua.match(/(HangJuAndroid|HangJuIOS)\(\w*\)\/[^\s]+/),
    shell = shell ? shell[0] : 'Browser',
    shellName = shell && shell.split('/')[0],
    shellVersion = shell && shell.split('/')[1],
    deliveryChannel = shellName && rDeliveryChannel.exec(shellName),
    isAndroidShell = shellName ? shellName.indexOf('HangJuAndroid') > -1 : false,
    isIOSShell = shellName ? shellName.indexOf('HangJuIOS') > -1 : false;

    deliveryChannel = deliveryChannel && (deliveryChannel[1] || '');

// alert(shell);
// alert(shellName);
// alert(shellVersion);
// alert(deliveryChannel);

var Env = {
    VERSION,

    dev: false,
    production: true,
    debug: false,

    guid: guid().generate('*-*-*'),

    /***** dev */
    devAPIScheme: '',
    devHost: '192.168.1.33:8888',
    devAPIHost: '192.168.1.33:8888',

    // devHost: 'testapi.ihangju.com',
    // devAPIHost: 'testapi.ihangju.com',

    /***** production */
    productionAPIScheme: 'https:',
    productionHost: 'h5app.ihangju.com',
    productionAPIHost: 'api.ihangju.com',


    shareHost: 'www.ihangju.com',

    shell: shell,
    shellVersion: shellVersion,
    isAndroidShell: isAndroidShell,
    isIOSShell: isIOSShell,

    platform: {
        android,
        ipad,
        iphone
    }
};

if (location.host.match(PRODUCTION_DOMAIN)) {
    Env.dev = false;
    Env.production = true;
} else {
    Env.dev = true;
    Env.production = false;
    Env.shareHost = 'test.ihangju.com';
}

if (location.search.indexOf('debug') > -1) {
    Env.debug = true;
}

export {Env};

