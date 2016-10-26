/**
 * Created by Howard on 16/6/27.
 */

const PRODUCTION_DOMAIN = 'h5.app.ihangju.com';
const PREPUB_DOMAIN = 'preh5.app.ihangju.com';
const CONTAINER_UA = {
    'android': 'HangJuAndroid', //HangJuAndroid/1.0 /线后是版本号
};

var Env = {
    dev: false,
    production: true,
    debug: false,

    shareHost: 'www.ihangju.com',

    devHost: '192.168.1.33:8888',
    devAPIHost: '192.168.1.33:8888',

    productionHost: 'h5.app.ihangju.com',
    productionAPIHost: 'api.ihangju.com',
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

