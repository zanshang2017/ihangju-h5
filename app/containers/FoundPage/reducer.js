/*
 *
 * FoundPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

    CHANGE_TAB,

    LOAD_DISCOVERIES_DATA,
    LOAD_DISCOVERIES_DATA_SUCCESS,
    LOAD_DISCOVERIES_DATA_ERROR,

    LOAD_RECOMMENDATION_DATA,
    LOAD_RECOMMENDATION_DATA_SUCCESS,
    LOAD_RECOMMENDATION_DATA_ERROR,

} from './constants';

const initialState = fromJS({
    discoveriesData: false,
    recommendationData: false,
    showTab: 1, //显示的tab内容编号
});

function foundPageReducer(state = initialState, action = null) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case CHANGE_TAB:

            return state;


        case LOAD_DISCOVERIES_DATA:
            return state;

        case LOAD_DISCOVERIES_DATA_SUCCESS:
            var data = action.payload.data;

            //数据结构
            //code:"ok"
            //result:Object
            //    banners:Array[3]
            //    discoverices_tags:Array[5]
            //    recomments:Array[3]
            //    tags:Array[11]

            if (data.code === 'ok' && data.result && data.result) {
                return state.set('discoveriesData', data.result);
            }

            return state;

        case LOAD_DISCOVERIES_DATA_ERROR:
            return state;


        case LOAD_RECOMMENDATION_DATA:
            return state;

        case LOAD_RECOMMENDATION_DATA_SUCCESS:
            var data = action.payload.data;

            if (data.code === 'ok' && data.result && data.result.length > 0) {
                return state.set('recommendationData', data.result);
            }

            return state;

        case LOAD_RECOMMENDATION_DATA_ERROR:
            return state;


        default:
            return state;
    }
}

export default foundPageReducer;
