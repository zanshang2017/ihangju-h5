/**
 * Created by Howard on 16/6/27.
 */

const PRODUCTION_DOMAIN = 'h5.app.ihangju.com';

var Env = {
    dev: false,
    production: true,
    debug: false,

    devHost: '192.168.1.33:8888',
    devAPIHost: '192.168.1.33:8888',

    productionHost: 'h5.app.ihangju.com',
    productionAPIHost: 'api.ihangju.com',
};

if (location.host.indexOf(PRODUCTION_DOMAIN) !== 0) {
    Env.dev = true;
    Env.production = false;
}

if (location.search.indexOf('debug') > -1) {
    Env.debug = true;
}

export {Env};

