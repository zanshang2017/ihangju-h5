/*
 *
 * SearchPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    DEFAULT_ACTION,
    CHANGE_TAB,
    REMOVE_ALL_HISTORY,
    ADD_HISTORY,
    INIT_HISTORY,
    SET_STATUS,

    LOAD_SEARCH_RESULT,
    LOAD_SEARCH_RESULT_SUCCESS,
    LOAD_SEARCH_RESULT_ERROR,

    SET_SEARCH_KEYWORD,
    SEARCH_HISTORY_KEYWORDS_LOCALSTORAGE,

    RESET_ALL_STATE,

} from './constants';

import {
    locStorage
} from 'utils/util';

const initialState = fromJS({
    searchKeyword: '',//当前搜索关键词
    currentTab: "1", //标签(1)、作品(2)、用户(3) 三个tab的切换
    historyKeywords: [], //历史搜索,存储在本地,最多5个

    searchData: false,
    searchStatus: fromJS({
        page: 0,
        loading: false,
        isProjectsLast: false,
        isUsersLast: false,
        isTagsLast: false,
    }),
});

function searchPageReducer(state = initialState, action = null) {
    let _state = null;

    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case CHANGE_TAB:
            return state.set('currentTab', action.payload.key);

        case SET_STATUS:
            return state.mergeDeepIn(['searchStatus'], fromJS(action.payload.status || []));

        case LOAD_SEARCH_RESULT:
            return state.setIn(['searchStatus', 'loading'], true);

        case LOAD_SEARCH_RESULT_SUCCESS:
            if (action.payload.page > 0) {
                let _projects = state.getIn(['searchData', 'projects']).toJS().concat(action.payload.data.result.projects || []);
                let _users = state.getIn(['searchData', 'users']).toJS().concat(action.payload.data.result.users || []);
                let _tags = state.getIn(['searchData', 'tags']).concat(action.payload.data.result.tags || []);

                _state = state.setIn(['searchData', 'projects'], fromJS(_projects));
                _state = _state.setIn(['searchData', 'users'], fromJS(_users));
                _state = _state.setIn(['searchData', 'tags'], fromJS(_tags));
            } else {
                _state = state.set('searchData', fromJS(action.payload.data.result));
            }

            return _state.setIn(['searchStatus', 'loading'], false);

        case LOAD_SEARCH_RESULT_ERROR:
            return state.setIn(['searchStatus', 'loading'], false);

        case INIT_HISTORY:
            return state.set('historyKeywords', fromJS(action.payload.keywords));

        case ADD_HISTORY:
            let historyList = state.get('historyKeywords').toJS() || [];

            if (historyList.indexOf(action.payload.keyword) > -1) {
                historyList.splice(historyList.indexOf(action.payload.keyword), 1);
            }

            if (historyList.length >= 5) {
                historyList.length = 4;
            }

            historyList.unshift(action.payload.keyword);

            locStorage.set(SEARCH_HISTORY_KEYWORDS_LOCALSTORAGE, JSON.stringify(historyList));
            return state.set('historyKeywords', fromJS(historyList));

        case REMOVE_ALL_HISTORY:
            locStorage.set(SEARCH_HISTORY_KEYWORDS_LOCALSTORAGE, JSON.stringify([]));
            return state.set('historyKeywords', fromJS([]));

        case RESET_ALL_STATE:
            console.log('initialState', initialState);
            return initialState;

        case SET_SEARCH_KEYWORD:
            return state.set('searchKeyword', action.payload.keyword);

        default:
            return state;
    }
}

export default searchPageReducer;
