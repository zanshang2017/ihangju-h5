import expect from 'expect';
import myPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('myPageReducer', () => {
  it('returns the initial state', () => {
    expect(myPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
