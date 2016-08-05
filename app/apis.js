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
}


//图片CDN
const IMG_CDN_PATH = 'https://o82zr1kfu.qnssl.com/@/';

//三方登录页
const THIRDPARTY_LOGIN_URL = `http://${thirdparty_login_domain}/oauth/authorize?client_id=ihangju&redirect_uri=http://${api_domain}/zanshang/authentication&response_type=code&scope=read&state=33251`;

//发现接口: 包含banner、分类tag和发现第一页的数据
const DISCOVERIES_API = `//${api_domain}/discoveries`;

//推荐接口: 推荐分页数据
const RECOMMENDATION_API = `//${api_domain}/recommendation`;


/**
 *  关注
 *
 *  参数：
 *      id: 关注标签id或用户id
 *      type: {tag | user} 关注类型
 *
 *  注：不加参数默认读取全部关注
 */
const MY_FOLLOW_API = `//${api_domain}/myfollow`;

/**
 *  关注目录
 *
 *  参数：
 *      page: {default:0}
 *      size: {default:10}
 *
 *  注：不加参数按默认参数读取
 */
const MY_FOLLOW_LIST_API = `//${api_domain}/myfollow/list`;


/**
 * 扫码登录
 *
 * 参数:
 *  sancodeid: 二维码code
 *  target: {}
 *  userid: 用户id
 *
 */
const CONFIRM_EDITOR_API = `//${api_domain}/confirm/editor`;
// sancodeid=579abdeee4b0968c87c1162c&target=console&userid=571dab71e4b0d50d21e7a9fc

/**
 * 获取用户信息,登录成功后立即请求
 *
 {
	"result": {
		"nickName": "十三",
		"pushConfig": {
			"rewardPush": true,
			"commentPush": true,
			"favoritePush": true,
			"letterPush": true
		},
		"description": "ciang",
		"id": "56ef7757e4b0bf20e0cb7eac",
		"avatar": "/image/5704d39ce4b08517134d0ba2.jpg",
		"tutor": false,
		"openPersonalizedRecommendation": false
	},
	"code": "ok"
}
 */
const USER_INFO_API = `//${api_domain}/user/me`;

/**
 * 灵感记录列表
 *
 * 参数：
 *      page: {default:0}
 *      size: {default:10}
 *
 * 注：不加参数按默认参数读取
 *
 * {
	"result": [{
		"modifyTime": 1469695198707,
		"id": "574d2654e4b0152896c086ac",
		"content": "让么么哒么么哒"
	}, {
		"modifyTime": 1469693625021,
		"id": "574d269ae4b0152896c086ca",
		"content": "对你的浓浓淡淡明明是满打满算是你们少男少女们的牛奶电脑电脑电脑电脑电脑你的目的是么么么么么么么么么么么么么么么么么么哒么么哒么么哒么么哒么么哒么"
	{
		"modifyTime": 1469098139885,
		"id": "5790a89be4b031f6e98e1fd8",
		"content": ""
	}],
	"code": "ok"
}
 *
 *
 *
 */
const NOTE_LIST_API = `//${api_domain}/user/notes`;

/**
 * 灵感记录
 *
 * 路径:
 *      /noteID
 *
 * Restful:
 *  GET: 获取
 *
 *  POST: 提交
 *      请求头:
 *      content-type: application/x-www-form-urlencoded
 *
 *      请求体:
 *      content=%E5%AF%B9%E4%BD%A0
 *
 *      注意:若url中不带noteID,则为新增一条记录;否则为修改相应记录
 *
 *
 * PUT:新增
 *     请求同POST.
 *
 * DELETE: 删除
 *
 *
 * GET响应:
 *  {
        "result": {
            "modifyTime": 1469693625021,
            "id": "574d269ae4b0152896c086ca",
            "content": "对你的浓浓淡淡明明是满打满算是你们少男少女们的牛奶电脑电脑电脑电脑电脑你的目的是么么么么么么么么么么么么么么么么么么哒么么哒么么哒么么哒么么哒么"
        },
        "code": "ok"
    }
 *
 * POST响应:
 *  {
	    "code": "ok"
    }


   PUT响应: 同POST.

   DELETE响应:同POST.
 *
 *
 */
const NOTE_API = `//${api_domain}/note`;


export {
    IMG_CDN_PATH,
    THIRDPARTY_LOGIN_URL,
    USER_INFO_API,
    CONFIRM_EDITOR_API,

    DISCOVERIES_API,
    RECOMMENDATION_API,

    MY_FOLLOW_API,
    MY_FOLLOW_LIST_API,

    NOTE_LIST_API,
    NOTE_API
};

