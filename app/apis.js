/**
 * Created by Howard on 16/6/27.
 *
 * API配置
 *
 */

import {Env} from './utils/env.js';

let api_host;
let thirdparty_login_domain;

if (Env.production) {
    api_host = Env.productionAPIHost;
    thirdparty_login_domain = 'oauth.zan-shang.com';
} else {
    api_host = Env.devAPIHost;
    thirdparty_login_domain = '192.168.1.33:7777';
}

//图片CDN
const IMG_CDN_PATH = 'https://o82zr1kfu.qnssl.com/@';

/**
 * 获取图片上传Token
 *
 * response:
 * {
	"uptoken": "xxxxxxxxxxx"
   }
 */
const IMG_UPLOAD_TOKEN_API = `//${api_host}/storage/image/uptoken`;


//三方登录页
const THIRDPARTY_LOGIN_URL = `//${thirdparty_login_domain}/oauth/authorize?client_id=ihangju&redirect_uri=http://${api_host}/zanshang/authentication&response_type=code&scope=read&state=33251`;

const THIRDPARTY_LOGOUT_URL = `//${thirdparty_login_domain}/authentication`; //method DELETE

//退出登录
/**
 * restful:
 *  [DELETE] 退出登录
 */
const LOGOUT_API = `//${api_host}/logout`;


/**
 * 错误日志
 * @type {string}
 */
const FEEDBACKLOG_API = `https://${api_host}/httpfeedback/upload`;



//发现接口: 包含banner、分类tag和发现第一页的数据
const DISCOVERIES_API = `//${api_host}/discoveries`;

//推荐接口: 推荐分页数据
const RECOMMENDATION_API = `//${api_host}/recommendation`;

/**
 * 发送设备号,用于接收推送
 *
 * restful:
 *  [PUT] 通知服务端为用户发送推送
 *        body: token=xxx&os={ios||android}
 *  [DELETE] 通知服务端停止推送消息
 *        body: token=xxx&os={ios||android}
 */
const DEVICETOKEN_API = `//${api_host}/devicetoken`;


/**
 *  关注
 *
 *  参数：
 *      id: 关注标签id或用户id
 *      type: {tag | user} 关注类型
 *
 *  注：不加参数默认读取全部关注
 */
const MY_FOLLOW_API = `//${api_host}/myfollow`;

/**
 * 关注设置
 *
 * restful:
 * [GET]  获取推荐的标签和用户
 * [PUT]  设置关注标签和用户
 *        body: tagids=aa,bb,cc&userids=dd,ee,ff
 */
const MY_FOLLOW_SETTING_API = `//${api_host}/myfollow/setting`;

/**
 *  关注目录
 *
 *  参数：
 *      page: {default:0}
 *      size: {default:10}
 *
 *  注：不加参数按默认参数读取
 */
const MY_FOLLOW_LIST_API = `//${api_host}/myfollow/list`;


/**
 * 获取引导页推荐数据
 *
 * [GET]
 *
 * @type {string}
 */
const FOLLOW_RECOMMENDATION_API = `//${api_host}/personalized/recommendation`;

/**
 * 扫码登录
 *
 * 参数:
 *  sancodeid: 二维码code
 *  target: {}
 *  userid: 用户id
 *
 */
const CONFIRM_EDITOR_API = `//${api_host}/confirm/editor`;
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
 *
 * restful:
 *  [GET] 获取用户信息
 *  [POST] 设置用户信息
 *      头像: avatar    {String} /image/57c7e146e4b0ddd2e19eff99.jpg
 *      昵称: nickname {String} 门神4.
 *      描述: description {String} 《收获》小门审.
 *      推送: favoritePush | commentPush | letterPush {Boolean}
 *      是否展示推荐关注: openPersonalizedRecommendation {Boolean} [true:展示推荐关注页| false:不展示推荐关注页]
 */
const USER_INFO_API = `//${api_host}/user/me`;

/**
 * 获取用户中心(MyPage)页数据
 {
 "result": {
     "tagmanagements": [{
         "name": "收获",
         "id": "5721c865e4b0d50d21e8ea6b",
         "notify_count": 5
     }],
     "managermentTagNumber": 1,
     "hasidentityauthentication": true,
     "collectionCount": 16,
     "identityauthenticationtype": "agency",
     "userinformation": {
         "name": "门神4",
         "description": "《收获》小门审",
         "id": "571dab71e4b0d50d21e7a9fc",
         "avatar": "/image/571df9f4e4b00659abde343d.jpg"
     },
     "notifications": {
         "comment_notify_count": 0,
         "letter_notify_count": 0,
         "discuss_notify_count": 0
     },
     "identityauthenticationstatus": "review"
 },
 "code": "ok"
}
 */
const USER_CENTER_API = `//${api_host}/user/center`;


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
const NOTE_LIST_API = `//${api_host}/user/notes`;

/**
 * 灵感记录
 *
 * 路径:
 *      /noteID
 *
 * Restful:
 *  [GET] 获取所有记录
 *  [POST] 提交
 *      请求头:
 *      content-type: application/x-www-form-urlencoded
 *
 *      请求体:
 *      content=%E5%AF%B9%E4%BD%A0
 *
 *      ** 注意:若url中不带noteID,则为新增一条记录;否则为修改相应记录 **
 *
 * [PUT]新增
 *     请求同POST.
 *
 * [DELETE] 删除
 *
 *
 *  GET响应:
 *  {
        "result": {
            "modifyTime": 1469693625021,
            "id": "574d269ae4b0152896c086ca",
            "content": "对你的浓浓淡淡明明是满打满算是你们少男少女们的牛奶电脑电脑电脑电脑电脑你的目的是么么么么么么么么么么么么么么么么么么哒么么哒么么哒么么哒么么哒么"
        },
        "code": "ok"
    }
 *
 *  POST响应:
 *  {
	    "code": "ok"
    }

 PUT响应: 同POST.
 DELETE响应:同POST.
 *
 *
 */
const NOTE_API = `//${api_host}/note`;

/**
 * 作品详情
 * 参数：
 *  id: projectId
 * http://192.168.1.33:8888/project/57a941f4e4b0ab2d4f0d14cd
 */
const PROJECTDETAIL_API = `//${api_host}/project`

/**
 * 章节阅读
 * 参数:
 * projectId chapterId
 * http://192.168.1.33:8888/project/57a941f4e4b0ab2d4f0d14cd/chapters
 */

const READCHAPTER_API = `//${api_host}/project`

/**
 * 作品API
 *
 * 路径: /${projectID} 获取作品详情
 * 路径: /${projectID}/comments 获取当前作品的评论
 *
 */
const PROJECT_API = `//${api_host}/project`


/**
 *  标签详情接口
 *
 *  restful:
 *
 *  [GET] 获取标签信息
 *  路径: /tagID 获取标签的项目列表+带项目基本信息, 默认分页 page:0, size:10
 *  路径: /tagID/recommdation/project 获取标签的推荐列表,带分页。
 *
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
 * [POST] 请求体数据:description=%BD%E5%A5%BD&image=/image/579af60ce4b02e1710abb71e.jpg 修改标签信息
 * [PUT] 请求体数据:/recommendation/project/projectids=${id} 设为推荐作品
 * [DELETE] /recommendation/project?projectids=${id} 取消推荐
 */
const TAG_API = `//${api_host}/tags`;

/**
 *  标签订阅接口
 *
 *  路径: /tagID 订阅或取消订阅的id
 *
 *  restful:
 *      [PUT]: 订阅
 *      [DELETE]: 取消订阅
 *
 */
const SUB_TAG_API = `//${api_host}/subscription/tag`;


/**
 * 获取用户首页信息
 * 子路径: /${userID} 获取指定uid的用户信息
 */
const USER_PROFILE_API = `//${api_host}/profile/`;

/**
 * 用户相关信息API
 *
 * restful:
 *  [GET] ${userID}/collection 获取收藏夹信息
 *  [GET] ${userID}/fans 获取粉丝
 *  [GET] ${userID}/follows 获取关注
 *  [GET] ${userID}/dialogues 私信列表
 *  [GET] ${userID}/management/tag 我管理的标签
 */
const USER_API = `//${api_host}/user/`;

/**
 * 关注、取消关注用户接口
 *
 * restful:
 *  [PUT] ${userID} 添加对特定user的关注
 *  [DELETE] ${userID} 取消对特定user的关注
 */
const FOLLOW_USER_API = `//${api_host}/subscription/user/`;

/**
 * 用户反馈
 *
 * restful:
 *  [PUT] 数据: contact=${email}&content=${message}
 */
const FEEDBACK_API = `//${api_host}/feedback`;

/**
 * 获取评论列表
 *
 * 参数:
 *      page: {default:0}
 *      size: {default:10}
 *
 * {
	"result": [{
		"time": 1470976033735,
		"projectName": "收藏夹",
		"type": "comment",
		"user": {
			"name": "苏OS x",
			"id": "56ef8c8ce4b0bf20e0cb7ebc",
			"avatar": "/image/576cf803e4b0b2aa0cf86e49.jpg"
		},
		"projectId": "57956e59e4b019e1f4c15112",
		"project_is_delete": false,
		"content": "Adage"
	 }, ... ]
   }
 */
const COMMENT_LIST_API = `//${api_host}/notification/comments`;

/**
 * 获取通知列表
 *
 * 参数:
 *      page: {default:0}
 *      size: {default:10}
 *
 * {
	"result": [{
		modifyTime": 1466764399155,
		"userAvatar": "/static/random6.png",
		"userName": "我的天",
		"projectName": "",
		"type": "favorite_user",
		"userId": "56f1fb8de4b0bbf134d9cb57",
		"projectId": ""
	 }, ... ]
   }
 */
const MESSAGE_LIST_API = `//${api_host}/notification/messages`;


/**
 * 发送评论接口
 *
 * restful:
 *  [PUT] 增加评论
 *
 *  body: content=${评论内容}&projectid=${项目id}
 */
const COMMENT_API = `//${api_host}/comment`;

/**
 * 发送评论答复接口
 *
 * restful:
 *  [PUT] 增加评论
 *
 *  body: content=${评论内容}&parentid=${项目id}&type=${'answer' || 'to_answer'}
 */
const ANSWER_API = `//${api_host}/answer`;


/**
 * 私信接口
 *
 * restful:
 *  [GET] /${letterGroupId}?size=100000 获取指定私信组的私信 //todo 加分页
 *  [PUT] body: userid=${对方userid} 增加私信组,返回私信组id
 *  [PUT] /${letterGroupId} 增加私信
 *        body: content=${私信内容}
 */
const DIALOGUE_API = `//${api_host}/dialogue`;


/**
 * 收藏接口
 * restful:
 * [PUT] 收藏
 * [DELETE] 取消收藏
 * 参数 : 57a941f4e4b0ab2d4f0d14cd/project
 */
const COLLECTION_API = `//${api_host}/collection/`;
//http://192.168.1.33:8888/favorite?projectid=57a941f4e4b0ab2d4f0d14cd
//http://192.168.1.33:8888/favorite  projectid : 57a941f4e4b0ab2d4f0d14cd


export {
    IMG_CDN_PATH,
    IMG_UPLOAD_TOKEN_API,

    THIRDPARTY_LOGIN_URL,
    THIRDPARTY_LOGOUT_URL,

    LOGOUT_API,
    USER_INFO_API,
    USER_CENTER_API,
    CONFIRM_EDITOR_API,

    FEEDBACKLOG_API,

    DEVICETOKEN_API,

    DISCOVERIES_API,
    RECOMMENDATION_API,

    MY_FOLLOW_API,
    MY_FOLLOW_SETTING_API,
    MY_FOLLOW_LIST_API,

    FOLLOW_RECOMMENDATION_API,

    NOTE_LIST_API,
    NOTE_API,

    PROJECT_API,
    PROJECTDETAIL_API,
    READCHAPTER_API,

    TAG_API,
    SUB_TAG_API,

    USER_PROFILE_API,

    USER_API,
    FOLLOW_USER_API,

    FEEDBACK_API,

    COMMENT_LIST_API,
    MESSAGE_LIST_API,

    COMMENT_API,
    ANSWER_API,

    DIALOGUE_API,
    COLLECTION_API,
};

