/*
 *
 * CreatePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

    CHANGE_TAB,

    LOAD_NOTES_DATA,
    LOAD_NOTES_DATA_SUCCESS,
    LOAD_NOTES_DATA_ERROR,

    LOAD_NOTE,
    LOAD_NOTE_SUCCESS,
    LOAD_NOTE_ERROR,

    SAVE_NOTE,
    SAVE_NOTE_SUCCESS,
    SAVE_NOTE_ERROR,

    UPDATE_NOTE_EDIT_CONTENT,

} from './constants';

const initialState = fromJS({
    notes: false,
    showTab: 1, //显示的tab内容编号
    currentNote: false, //当前编辑note的基本信息
    noteContent: '', //当前编辑note的内容
});

function createPageReducer(state = initialState, action = null) {
// debugger;
    let data = null;

    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case CHANGE_TAB:
            return state.set('showTab', action.payload.id);

        case LOAD_NOTES_DATA:
            return state;

        case LOAD_NOTES_DATA_SUCCESS:

            data = action.payload.data;
            let page = action.payload.page;

            //数据结构
            //code:"ok"
            //result:Array
            //    {
            //      "modifyTime":1469695198707,
            //      "id":"574d2654e4b0152896c086ac",
            //      "content":"让么么哒么么哒"
            //    }, ....

            if (data.code === 'ok' && data.result && data.result) {
                if(page && page > 0){
                    return state.mergeDeepIn(['notes'], data.result || []);
                } else {
                    return state.set('notes', fromJS(data.result));
                }
            }

            return state;

        case LOAD_NOTES_DATA_ERROR:
            return state;

        case LOAD_NOTE:
            return state;

        case LOAD_NOTE_SUCCESS:

            data = action.payload.data || {};

            //数据结构
            //code:"ok"
            //result:
            //    {
            //      "modifyTime":1469695198707,
            //      "id":"574d2654e4b0152896c086ac",
            //      "content":"让么么哒么么哒"
            //    }
            if (data.code === 'ok' && data.result && data.result) {
                var ret = state.set('currentNote', fromJS(data.result)).set('noteContent', data.result.content || '');
                return ret;
            }

            return state;

        case UPDATE_NOTE_EDIT_CONTENT:
            debugger;
            return state.set('noteContent', action.payload.content || '');

        default:
            return state;
    }
}

export default createPageReducer;
