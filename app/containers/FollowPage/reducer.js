/*
 *
 * FollowPage reducer
 *
 */

import {
    fromJS,
} from 'immutable';

import {
    DEFAULT_ACTION,

    LOAD_MY_FOLLOW_DATA,
    LOAD_MY_FOLLOW_DATA_SUCCESS,
    LOAD_MY_FOLLOW_DATA_ERROR,

    LOAD_MY_FOLLOW_LIST_DATA,
    LOAD_MY_FOLLOW_LIST_DATA_SUCCESS,
    LOAD_MY_FOLLOW_LIST_DATA_ERROR,

    CHANGE_CURRENT_FOLLOW,

} from './constants';

const initialState = fromJS({
    myFollowData: false,
    myFollowListData: fromJS({
        'followUsers': [],
        'followTags': []
    }),
    currentFollow: false, //当前选择的列表类型， null表示未选择，默认加载全部关注
    myFollowLoading: false, //关注文章列表加载中
    myFollowListLoading: false //关注分类列表加载中
});

function followPageReducer(state = initialState, action = null) {
    console.log(action.type);

    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_MY_FOLLOW_DATA:
            return state.set('myFollowLoading', false);

        case LOAD_MY_FOLLOW_DATA_SUCCESS:

            var data = action.payload.data;
            var page = action.payload.page;

            //数据结构
            //code:"ok"
            //result:Array
            //[
            //    {
            //        "commentNumber": 1,
            //        "modifyTime": 1464513347761,
            //        "sources": [{
            //            "name": "温润",
            //            "id": "57381461e4b0afac484dcbe9",
            //            "type": "user"
            //        }, {
            //            "name": "小说",
            //            "id": "569c59bde4b0e66de0ec4a99",
            //            "type": "tag"
            //        }],
            //        "description": "一个寒冷阴郁的冬日，医院门口，一个包裹严实的女人和一个稚气未脱的女孩，还有一个瘦小的男人，费力地招呼着出租车……",
            //        "id": "574ab02ae4b0960c06612328",
            //        "projectName": "那是冬天",
            //        "likeNumber": 0
            //    }
            //]
            if (data.code === 'ok' && data.result && data.result.length > 0) {
                if(page > 0){
                    return state.set('myFollowLoading', false).mergeDeepIn(['myFollowData'], data.result || []);
                } else {
                    return state.set('myFollowLoading', false).set('myFollowData', fromJS(data.result));
                }
            }

            return state;

        case LOAD_MY_FOLLOW_DATA_ERROR:
            return state.set('myFollowLoading', false);

        case LOAD_MY_FOLLOW_LIST_DATA:
            return state.set('myFollowListLoading', true);

        case LOAD_MY_FOLLOW_LIST_DATA_SUCCESS:
            var data = action.payload.data;
            var page = action.payload.page || 0;

            //数据结构
            //code:"ok"
            //result:Object
            //{
            //    "followTags" :[{
            //        "name": "互联网",
            //        "update": false,
            //        "id": "5668f4e2e4b01e45e63bf472"
            //    }, {
            //        "name": "文化",
            //        "update": false,
            //        "id": "56974a7ce4b04c20265514bc"
            //    }],
            //    "followUsers": [{
            //    "name": "守望",
            //    "update": false,
            //    "id": "56ef7c47e4b0bf20e0cb7eb3"
            //    }]
            //}

            if (data.code === 'ok' && data.result && (data.result.followTags || data.result.followUsers)) {
                return state.set('myFollowListLoading', false).mergeDeepIn(['myFollowListData'], data.result || []);
            }

            return state;

        case LOAD_MY_FOLLOW_LIST_DATA_ERROR:
            return state.set('myFollowListLoading', false);

        case CHANGE_CURRENT_FOLLOW:
            var data = action.payload;
            return state.set('currentFollow', data || {});

        default:
            return state;
    }
}

export default followPageReducer;
