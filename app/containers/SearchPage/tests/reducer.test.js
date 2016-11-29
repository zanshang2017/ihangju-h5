import expect from 'expect';
import foundPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('foundPageReducer', () => {
  it('returns the initial state', () => {
    expect(foundPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
