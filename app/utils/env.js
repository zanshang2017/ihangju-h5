/**
 * Created by Howard on 16/6/27.
 */

const PRODUCTION_DOMAIN = 'www.ihangju.com';

var Env = {
    dev: false,
    prod: true,
    debug: false
};

if(location.host.indexOf(PRODUCTION_DOMAIN) < 0){
    Env.dev = true;
    Env.prod = false;
}

if(location.search.indexOf('debug') > -1){
    Env.debug = true;
}

export { Env };

