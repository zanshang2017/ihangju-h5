/*
 *
 * FollowRecommendationPage reducer
 *
 */

import {fromJS, Map} from 'immutable';

import {
    DEFAULT_ACTION,

    LOAD_RECOMMENDATION_DATA,
    LOAD_RECOMMENDATION_DATA_SUCCESS,
    LOAD_RECOMMENDATION_DATA_ERROR,

    CHOICE_TYPE,
    CHANGE_CHOICE_TYPE,

    TOGGLE_SELECT,

} from './constants';

const initialState = fromJS({
    recommendation: fromJS({
        data: false,
        loading: false,
    }),
    choiceType: CHOICE_TYPE.TAGS
});

function FollowRecommendationPageReducer(state = initialState, action = {}) {

    var data = null;

    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_RECOMMENDATION_DATA:
            return state.setIn(['recommendation', 'loading'], true);

        case LOAD_RECOMMENDATION_DATA_SUCCESS:
            data = action.payload.data;

            //增加选择字段
            if (data.users) {
                data.users.map(function (v) {
                    v.selected = true;
                });
            }

            if (data.tags) {
                data.tags.map(function (v) {
                    v.selected = true;
                });
            }

            state = state.setIn(['recommendation', 'data'], fromJS(data));

            return state.setIn(['recommendation', 'loading'], false);

        case LOAD_RECOMMENDATION_DATA_ERROR:
            return state.setIn(['recommendation', 'loading'], false);

        case CHANGE_CHOICE_TYPE:
            return state.set('choiceType', action.payload.type);

        case TOGGLE_SELECT:
            let _id = action.payload.id;

            switch (action.payload.type) {
                case CHOICE_TYPE.TAGS:
                    let _tags = state.getIn(['recommendation', 'data', 'tags']);
                    _tags = _tags.toJS();

                    _tags.map(function (v) {
                        if (v.id === _id) {
                            v.selected = !v.selected;
                        }
                    });

                    return state.setIn(['recommendation', 'data', 'tags'], fromJS(_tags));

                case CHOICE_TYPE.USERS:
                    let _users = state.getIn(['recommendation', 'data', 'users']).toJS();

                    _users.map(function (v) {
                        if (v.id === _id) {
                            v.selected = !v.selected;
                        }
                    });

                    return state.setIn(['recommendation', 'data', 'users'], fromJS(_users));

                default:
                    break;
            }

            return state;

        default:
            return state;
    }
}

export default FollowRecommendationPageReducer;
