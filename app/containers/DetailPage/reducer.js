/*
 *
 * MyPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
	'projectTag' : ['旅行','杂文','小说']
});

function myPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default myPageReducer;
