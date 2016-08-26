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


/*
* 作品详情
* 参数：
*  id: projectId
* http://192.168.1.33:8888/project/57a941f4e4b0ab2d4f0d14cd
*/
const PROJECTDETAIL_API = `//${api_domain}/project`
/*
* 章节阅读
* 参数:
* projectId chapterId
* http://192.168.1.33:8888/project/57a941f4e4b0ab2d4f0d14cd/chapters
*/

const READCHAPTER_API = `//${api_domain}/project`

/**
 *
 *  标签详情接口
 *
 *  路径: /tagID 获取标签的项目列表+带项目基本信息, 默认分页 page:0, size:10
 *  路径: /tagID/recommdation/project 获取标签的推荐列表,带分页。
 *
 *  GET方法:获取标签信息,
 *  响应:
 *  {
	"result": {
	    "tag_name": "非虚构",
		"extistAdminstrator": false,
		"isFollow": true,
		//对应标签下的项目
		"projects": [{
			"commentNumber": 1,
			"image": "/image/56dd50f1e4b060f2db4e30ba.png?imageMogr2/thumbnail/!100p/crop/!288x380a0a0",
			"modifyTime": 1470561050777,
			"appreciateNumber": 0,
			"authorName": "潘沫洁",
			"description": "东汉末年，宦官与外戚势力的争斗，后宫争宠，妇人干政，三国雄起，历经四百年的大汉王朝，已无力挽狂澜之势，最终走向了灭亡。",
			"browseNumber": 209,
			"id": "579ed8c5e4b02e1710ac3a36",
			"projectName": "汉锵锵 河汤汤",
			"authorId": "579eca8ae4b02e1710ac37e0",
			"likeNumber": 0,
			"isRecommdationProject": false
		},
		... ],
		"top": null,
		//推荐的项目
		"recommendation_projects": [
		{
			"commentNumber": 3,
			"image": "/image/56dd50f1e4b060f2db4e30ba.png?imageMogr2/thumbnail/!100p/crop/!288x380a0a0",
			"modifyTime": 1469371539724,
			"appreciateNumber": 0,
			"authorName": "贾周章",
			"description": "",
			"browseNumber": 633,
			"id": "5794d326e4b0c19aad69d61d",
			"projectName": "我与书店的故事",
			"authorId": "57244839e4b0d50d21e993a9",
			"likeNumber": 4
		},
		...	],
		"attention_number": 968,
		"tag_description": null,
		"tagAdminstrators": [{
			"name": "小行行",
			"description": "行距小管家",
			"id": "56ef9c3ae4b0bf20e0cb7ed2",
			"avatar": "/image/5743b85fe4b00243fbd23456.jpg"
		}],
		"tag_managerment": false,
		"tag_image": "/image/57909fd2e4b0e9e23ee080a8.jpg"
	},
	"code": "ok"
}
 *
 *
 * POST方法: 修改标签信息
 *   数据: description=%BD%E5%A5%BD&image=/image/579af60ce4b02e1710abb71e.jpg
 *
 * PUT方法: 设置推荐作品
 *  数据: projectids=xxxxxxxx
 *
 * DELETE方法:
 *  url参数: ?projectids=57a2e568e4b081dc933f7334
 *
 */
const TAG_API = `//${api_domain}/tags`;

/**
 *  标签订阅接口
 *
 *  路径: /tagID 订阅或取消订阅的id
 *
 *  restful:
 *      PUT: 订阅
 *      DELETE: 取消订阅
 *
 */
const SUB_TAG_API = `//${api_domain}/subscription/tag`










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
    NOTE_API,

    PROJECTDETAIL_API,
    TAG_API,

    SUB_TAG_API,

    READCHAPTER_API,
};

