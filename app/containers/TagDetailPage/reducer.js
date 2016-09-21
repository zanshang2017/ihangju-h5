/*
 *
 * TagDetailPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    DEFAULT_ACTION,

    LOAD_TAG_LIST,
    LOAD_TAG_LIST_SUCCESS,
    LOAD_TAG_LIST_ERROR,

    LOAD_TAG_RECOMMENDATION_LIST,
    LOAD_TAG_RECOMMENDATION_LIST_SUCCESS,
    LOAD_TAG_RECOMMENDATION_LIST_ERROR,

    SUB_TAG,
    SUB_TAG_SUCCESS,
    SUB_TAG_ERROR,

    CANCEL_SUB_TAG,
    CANCEL_SUB_TAG_SUCCESS,
    CANCEL_SUB_TAG_ERROR,

    RECOMMENDATION_PROJECT,
    RECOMMENDATION_PROJECT_SUCCESS,
    RECOMMENDATION_PROJECT_ERROR,

    SET_RECOMMENDATION_LIST_STATUS,
    SET_PROJECT_LIST_STATUS,

    SET_EDITING,
    SET_DETAIL,

    RESET_ALL_STATE,

} from './constants';

const initialState = fromJS({
    isEditing: false,
    detail: false,
    projectList: false,
    recommendationList: false,

    recommendationListStatus: fromJS({
        page: 0,
        isLast: false,
        loading: false,
    }),

    projectListStatus: fromJS({
        page: 0,
        isLast: false,
        loading: false,
    })
});

function tagDetailPageReducer(state = initialState, action = {}) {

    let data = null,
        page = 0;

    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_TAG_LIST:
            console.log('loading=true')
            return state.setIn(['projectListStatus', 'loading'], true);
        // return state;

        case LOAD_TAG_LIST_SUCCESS:

            console.log('loading=false')

            data = action.payload.data;
            page = action.payload.page;

            if (data.code === 'ok' && data.result) {
                let res = data.result;

                if (page > 0) {
                    let _merged = state.get('projectList').concat(fromJS(res.projects));
                    let _state = state.set('projectList', _merged);
                    return _state.setIn(['projectListStatus', 'loading'], false);
                } else {
                    let _state = state.set('projectList', fromJS(res.projects));

                    let detail = {
                        tag_name: res.tag_name || '',
                        extistAdminstrator: res.extistAdminstrator || false,
                        isFollow: res.isFollow || false,
                        attention_number: res.attention_number || 0,
                        tag_description: res.tag_description || null,
                        tagAdminstrators: res.tagAdminstrators || [],
                        tag_managerment: res.tag_managerment || false,
                        tag_image: res.tag_image || ''
                    };

                    _state = _state.set('detail', fromJS(detail));

                    return _state.setIn(['projectListStatus', 'loading'], false);
                }
            }

            return state;

        case LOAD_TAG_LIST_ERROR:
            console.log('loading=false');

            return state.setIn(['projectListStatus', 'loading'], false);

        case LOAD_TAG_RECOMMENDATION_LIST:
            return state.setIn(['recommendationListStatus', 'loading'], false);

        case LOAD_TAG_RECOMMENDATION_LIST_SUCCESS:

            data = action.payload.data;
            page = action.payload.page;

            if (data.code === 'ok' && data.result && data.result.length > 0) {

                // 接口没有提供的字段,手工补齐
                data.result.forEach(function (v) {
                    v['isRecommdationProject'] = true;
                });

                if (page > 0) {
                    let _merged = state.get('recommendationList').concat(fromJS(data.result));

                    return state.set('recommendationList', _merged).setIn(['recommendationListStatus', 'loading'], false);
                } else {
                    return state.set('recommendationList', fromJS(data.result)).setIn(['recommendationListStatus', 'loading'], false);
                }
            }

            return state;

        case LOAD_TAG_RECOMMENDATION_LIST_ERROR:
            return state.setIn(['recommendationListStatus', 'loading'], false);

        case SET_PROJECT_LIST_STATUS:
            data = action.payload;

            if (typeof data.page === 'number' && data.page >= 0) {
                state = state.setIn(['projectListStatus', 'page'], data.page);
            }

            if (typeof data.isLast !== 'undefined' && typeof data.isLast === 'boolean') {
                state = state.setIn(['projectListStatus', 'isLast'], data.isLast);
            }

            if (typeof data.loading === 'boolean') {
                state = state.setIn(['projectListStatus', 'loading'], data.loading);
            }

            return state;

        case SET_RECOMMENDATION_LIST_STATUS:
            data = action.payload;

            if (typeof data.page === 'number' && data.page >= 0) {
                state = state.setIn(['recommendationListStatus', 'page'], data.page);
            }

            if (typeof data.isLast !== 'undefined' && typeof data.isLast === 'boolean') {
                state = state.setIn(['recommendationListStatus', 'isLast'], data.isLast);
            }

            if (typeof data.loading === 'boolean') {
                state = state.setIn(['recommendationListStatus', 'loading'], data.loading);
            }

            return state;

        case RECOMMENDATION_PROJECT_SUCCESS:
            let isRemove = action.payload.isRemove;
            let id = action.payload.id;

            //更新对应项目id的isRecommdationProject属性
            let allList = state.get('projectList').toJS();

            allList.map(function(v) {
                 if(v.id === id) {
                     v.isRecommdationProject = !isRemove;
                 }
            });

            state = state.set('projectList', fromJS(allList));

            let recommList = state.get('recommendationList').toJS();

            recommList.map(function(v) {
                if(v.id === id) {
                    v.isRecommdationProject = !isRemove;
                }
            });



            return state.set('recommendationList', fromJS(recommList));

        case RECOMMENDATION_PROJECT_ERROR:
            return state;

        case SUB_TAG:
        case SUB_TAG_ERROR:
            return state;

        case SUB_TAG_SUCCESS:
            return state.setIn(['detail', 'isFollow'], true);

        case CANCEL_SUB_TAG:
        case CANCEL_SUB_TAG_ERROR:
            return state;

        case CANCEL_SUB_TAG_SUCCESS:
            return state.setIn(['detail', 'isFollow'], false);

        case RECOMMENDATION_PROJECT:
            return state;

        case SET_EDITING:
            return state.set('isEditing', action.payload.value || false);

        case SET_DETAIL:
            data = action.payload.data;

            if (data) {
                let _state = null;

                Object.keys(data).forEach(function (k) {
                    _state = state.setIn(['detail', k], data[k]);
                });

                return _state;
            }

            return state;

        case RESET_ALL_STATE:
            console.log('initialState', initialState);
            return initialState;

        default:
            return state;
    }
}

export default tagDetailPageReducer;
