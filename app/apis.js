/**
 * Created by Howard on 16/6/27.
 *
 * API配置
 *
 */

import {Env} from './utils/env.js';

let api_domain;
let thirdparty_login_domain;

if (Env.prod) {
    api_domain = 'www.ihangju.com';
    thirdparty_login_domain = 'oauth.zan-shang.com';
} else {
    api_domain = '192.168.1.33:8888';
    thirdparty_login_domain = '192.168.1.33:7777';
    //thirdparty_login_domain = '192.168.1.57:8080';
}


//三方登录页
const THIRDPARTY_LOGIN_URL = `http://${thirdparty_login_domain}/oauth/authorize?client_id=ihangju&redirect_uri=http://${api_domain}/zanshang/authentication&response_type=code&scope=read&state=33251`;

//发现接口: 包含banner、分类tag和发现第一页的数据
const DISCOVERIES_API = `//${api_domain}/discoveries`;

//推荐接口: 推荐分页数据
const RECOMMENDATION_API = `//${api_domain}/recommendation`;

//图片CDN
const IMG_CDN_PATH = 'https://o82zr1kfu.qnssl.com/@/';


export {
    THIRDPARTY_LOGIN_URL,
    DISCOVERIES_API,
    RECOMMENDATION_API,
    IMG_CDN_PATH
};

