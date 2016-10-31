/**
 * Created by Howard on 16/6/27.
 */

// const PRODUCTION_DOMAIN = 'h5.app.ihangju.com';
const PRODUCTION_DOMAIN = 'h5.dev.ihangju.com'; //todo 测试后记得恢复!
const PREPUB_DOMAIN = 'preh5.app.ihangju.com';

var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
    shell = ua.match(/HangJuAndroid\/[^\s]+/),
    shell = shell ? shell[0] : 'Web',
    shellName = shell && shell.split('/')[0],
    shellVersion = shell && shell.split('/')[1];

// alert(ua);
// alert(shell);
// alert(shellName);
// alert(shellVersion);

var Env = {
    dev: false,
    production: true,
    debug: false,

    shareHost: 'www.ihangju.com',

    devHost: '192.168.1.33:8888',
    devAPIHost: '192.168.1.33:8888',

    // devHost: 'testapi.ihangju.com',
    // devAPIHost: 'testapi.ihangju.com',

    productionHost: 'h5.app.ihangju.com',
    productionAPIHost: 'api.ihangju.com',

    shell: shell,
    shellVersion: shellVersion,

    platform: {
        android,
        ipad,
        iphone,
    }
};

if (location.host.indexOf(PRODUCTION_DOMAIN) === 0) {
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

