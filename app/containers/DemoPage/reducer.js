/*
 * Reducer只关心数据，根据action.type和action.payload设置state
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,
    DEL_ITEM,
    LOADLIST,
    LOADLIST_SUCCESS,
    LOADLIST_ERROR
} from './constants';

//页面初始化数据
const initialState = fromJS({
    'testDemo': 'it`s just a demo.',
    'items': ['aaa', 'bbb'],
    'listItems': []
});

function demoPageReducer(state = initialState, action = null) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case DEL_ITEM:
            return state.set('items', state.get('items').remove(action.payload.index));

        case LOADLIST:
            //todo loading动画
            return state;

        case LOADLIST_SUCCESS:
            return state.set('listItems', action.payload.list);

        default:
            return state;
    }
}

export default demoPageReducer;


