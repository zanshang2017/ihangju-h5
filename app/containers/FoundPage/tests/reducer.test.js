import expect from 'expect';
import followPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('followPageReducer', () => {
  it('returns the initial state', () => {
    expect(followPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
